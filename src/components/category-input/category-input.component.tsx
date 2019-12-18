// react
import React, { FormEvent, useState, useContext, useRef } from "react";

// contexts
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import {
  addActivityName,
  editActivityName,
  addDetailName,
  editDetailName
} from "../../contexts/categories/categories.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    width: "100%"
  },
  textField: {
    padding: theme.spacing(1)
  },
  editIcon: {
    padding: theme.spacing(1)
    // fill: "#557F2F" //rgb(160,82,45)
  }
}));

/* const getEditIconColor = (value: string, name: string) =>
  value !== name ? "primary" : "default"; */
const getEditIconStyle = (value: string, name: string) => ({
  color: value !== name ? "primary" : "default",
  transition: "transform 0.5s",
  transform: value !== name ? "rotate(180deg)" : "rotate(0deg)"
});

interface Item {
  id: string;
  name: string;
  detailIds?: string[];
}

interface CategoryInputProps {
  item: Item;
  activityId?: string;
}

const CategoryInput = ({ item, activityId }: CategoryInputProps) => {
  const classes = useStyles({});
  const { dispatchCategories } = useContext(CategoriesContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  const [category, setCategory] = useState(item.name);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category === item.name) {
      // focus on text field if no changes have been made
      inputRef.current.focus();
    } else {
      if (!category) {
        dispatchSnackbar(
          openSnackbar({ msg: "Name cannot be empty.", variant: "error" })
        );
        setCategory(item.name);
        formRef.current.reset();
      } else if (
        category === "Interruption" ||
        category === "-" ||
        category === "Unsorted"
      ) {
        dispatchSnackbar(
          openSnackbar({ msg: "This name is reserved.", variant: "error" })
        );
        setCategory(item.name);
        formRef.current.reset();
      } else {
        // check for item type: acitivty or detail
        if (item.detailIds) {
          // is activity
          if (item.id) {
            dispatchCategories(
              editActivityName({
                activityId: item.id,
                name: category
              })
            );
          } else {
            dispatchCategories(addActivityName(category));
          }

          dispatchSnackbar(
            openSnackbar({ msg: "Activity name edited.", variant: "success" })
          );
        } else {
          // is detail

          if (item.id) {
            dispatchCategories(
              editDetailName({
                detailId: item.id,
                name: category
              })
            );
          } else {
            dispatchCategories(
              addDetailName({
                activityId,
                name: category
              })
            );
          }

          dispatchSnackbar(
            openSnackbar({ msg: "Detail name edited.", variant: "success" })
          );
        }
        // clear input after adding new entry
        if (item.id === null) {
          setCategory("");
          formRef.current.reset(); // manually reset form
        }
      }
    }
  };
  return (
    <form
      onSubmit={event => handleSubmit(event)}
      ref={formRef} // ref for manually reset form
      className={classes.form}
    >
      <TextField
        fullWidth
        inputRef={inputRef} // ref for focusing upon first clicking submit
        defaultValue={category}
        placeholder={!item.name ? "Add a new one here!" : null}
        onChange={e => setCategory(e.target.value)}
        margin={"dense"}
        className={classes.textField}
      />

      <IconButton
        type="submit"
        // temp workaround to animate this IconButton
        // color={getEditIconColor(category, item.name)}
        style={getEditIconStyle(category, item.name)}
        className={classes.editIcon}
      >
        <CreateIcon />
      </IconButton>
    </form>
  );
};

export default CategoryInput;

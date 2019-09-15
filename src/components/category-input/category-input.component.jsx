// react
import React, { useState, useContext, useRef } from "react";

// contexts
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import {
  editActivityName,
  editDetailName
} from "../../contexts/categories/categories.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles({
  form: {
    display: "flex"
  },
  editIcon: {
    // fill: "#557F2F" //rgb(160,82,45)
  }
});

const getEditIconColor = (value, name) =>
  value !== name ? "primary" : "default";
const getEditIconStyle = (value, name) => ({
  color: value !== name ? "primary" : "default",
  transition: "transform 0.5s",
  transform: value !== name ? "rotate(180deg)" : "rotate(0deg)"
});

const CategoryInput = ({ item, activityId }) => {
  const classes = useStyles();
  const { dispatchCategories } = useContext(CategoriesContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  const [category, setCategory] = useState(item.name);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (category === item.name) {
      // focus on text field if no changes have been made (reack hooks solution)
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
          dispatchCategories(
            editActivityName({
              activityId: item.id,
              name: category
            })
          );
          dispatchSnackbar(
            openSnackbar({ msg: "Activity name edited.", variant: "success" })
          );
        } else {
          // is detail
          dispatchCategories(
            editDetailName({
              activityId: activityId,
              detailId: item.id,
              name: category
            })
          );
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
      className={classes.form}
      ref={formRef} // ref for manually reset form
    >
      <TextField
        inputRef={inputRef} // ref for focusing upon first clicking submit
        defaultValue={category}
        placeholder={!item.name ? "Add a new one here!" : null}
        onChange={e => setCategory(e.target.value)}
        margin={"dense"}
        variant="outlined"
      />

      <IconButton
        type="submit"
        // temp workaround to animate this IconButton
        color={getEditIconColor(category, item.name)}
        style={getEditIconStyle(category, item.name)}
      >
        <CreateIcon className={classes.editIcon} />
      </IconButton>
    </form>
  );
};

export default CategoryInput;

// react
import React, { useState, useContext, useRef } from "react";
import { CategoriesContext } from "../contexts/categoriesContext";

// material ui
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";

// libs
import { useSnackbar } from "notistack";

const styles = () => ({
  form: {
    display: "flex"
  },
  editIcon: {
    fill: "#557F2F" //rgb(160,82,45)
  }
});

const getEditIconColor = (value, name) =>
  value !== name ? "primary" : "default";
const getEditIconStyle = (value, name) => ({
  color: value !== name ? "primary" : "default",
  transition: "transform 0.5s",
  transform: value !== name ? "rotate(180deg)" : "rotate(0deg)"
});

const CategoriesInput = props => {
  const { classes, item } = props;
  const { dispatch } = useContext(CategoriesContext);
  const [category, setCategory] = useState(props.item.name);
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const handleChange = e => {
    setCategory(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { item, activityId } = props;
    if (category === item.name) {
      // focus on text field if no changes have been made (reack hooks solution)
      inputRef.current.focus();
    } else {
      if (!category) {
        enqueueSnackbar("Name cannot be empty.", {
          variant: "error"
        });
        setCategory(item.name);
        formRef.current.reset();
      } else if (
        category === "Interruption" ||
        category === "-" ||
        category === "Unsorted"
      ) {
        enqueueSnackbar("This name is reserved.", {
          variant: "error"
        });
        setCategory(item.name);
        formRef.current.reset();
      } else {
        // check for item type: acitivty or detail
        if (item.detailIds) {
          // is activity
          dispatch({
            type: "EDIT_ACTIVITY_NAME",
            payload: {
              activityId: item.id,
              name: category
            }
          });
          enqueueSnackbar("Activity name edited.", {
            variant: "success"
          });
        } else {
          // is detail
          dispatch({
            type: "EDIT_DETAIL_NAME",
            payload: {
              activityId: activityId,
              detailId: item.id,
              name: category
            }
          });
          enqueueSnackbar("Detail name edited.", {
            variant: "success"
          });
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
        onChange={e => handleChange(e)} // to-check: can do onChange={handleChange}?
        margin={"dense"}
        variant="outlined"
      />

      <IconButton
        type="submit"
        aria-label="Edit"
        // temp workaround to animate this IconButton
        color={getEditIconColor(category, item.name)}
        style={getEditIconStyle(category, item.name)}
      >
        <CreateIcon classes={{ root: classes.editIcon }} />
      </IconButton>
    </form>
  );
};

export default withStyles(styles)(CategoriesInput);

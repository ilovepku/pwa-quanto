import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

const Select = ({ classes, label, items, handleChange }) => {
  const list = items.length ? (
    items.map(item => {
      return (
        <option value={item.name} key={item.name}>
          {item.name}
        </option>
      );
    })
  ) : (
    <option value="-">-</option>
  );
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="activity-native-label-placeholder">
          {label}
        </InputLabel>
        <NativeSelect
          onChange={event => handleChange(event.target.value)}
          input={
            <Input name="activity" id="activity-native-label-placeholder" />
          }
        >
          {list}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

Select.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Select);

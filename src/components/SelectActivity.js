import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { setActivityCategory } from "../actions";

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

const mapStateToProps = state => {
  return {
    activityList: state.setActivityListReducer.activityList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivityCategory: value => dispatch(setActivityCategory(value))
  };
};

const SelectActivity = ({ classes, activityList, setActivityCategory }) => {
  const list = activityList
    .filter(item => !item.parent)
    .map(item => {
      return (
        <option value={item.name} key={item.name}>
          {item.name}
        </option>
      );
    });

  /* const list = items.length ? (
    items.map(item => {
      return (
        <option value={item.name} key={item.name}>
          {item.name}
        </option>
      );
    })
  ) : (
    <option value="-">-</option>
  ); */

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="activity-native-label-placeholder">
          Activity
        </InputLabel>
        <NativeSelect
          onChange={event => setActivityCategory(event.target.value)}
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

SelectActivity.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SelectActivity)
);

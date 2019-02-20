import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { setActivityDetail } from "../actions";

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
    activityList: state.setActivityListReducer.activityList,
    category: state.setActivityReducer.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivityDetail: value => dispatch(setActivityDetail(value))
  };
};

const SelectDetail = ({
  classes,
  activityList,
  category,
  setActivityDetail
}) => {
  const detailList = activityList.filter(item => item.parent === category);
  const list = detailList.length ? (
    detailList.map(item => {
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
        <InputLabel shrink htmlFor="detail-native-label-placeholder">
          Detail
        </InputLabel>
        <NativeSelect
          onChange={event => setActivityDetail(event.target.value)}
          input={<Input name="detail" id="detail-native-label-placeholder" />}
        >
          {list}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

SelectDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SelectDetail)
);

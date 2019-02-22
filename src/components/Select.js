import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { setActivity, setDetail } from "../actions";

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
    activityNameList: state.activityNameList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivity: payload => dispatch(setActivity(payload)),
    setDetail: payload => dispatch(setDetail(payload))
  };
};

const Select = ({
  classes,
  activityNameList,
  activity,
  detail,
  index,
  setActivity,
  setDetail
}) => {
  const activityList = [...new Set(activityNameList.map(item => item.parent))];
  const detailList = activityNameList.filter(item => item.parent === activity);

  const activityListItems = activityList.map(item => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });
  const detailListItems = detailList.map(item => {
    return (
      <option value={item.name} key={item.name}>
        {item.name}
      </option>
    );
  });

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="activity-native-label-placeholder">
          Activity
        </InputLabel>
        <NativeSelect
          value={activity}
          onChange={event =>
            setActivity({
              activity: event.target.value,
              index
            })
          }
          input={
            <Input name="activity" id="activity-native-label-placeholder" />
          }
        >
          {activityListItems}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="detail-native-label-placeholder">
          Detail
        </InputLabel>
        <NativeSelect
          value={detail}
          onChange={event => setDetail({ detail: event.target.value, index })}
          input={<Input name="detail" id="detail-native-label-placeholder" />}
        >
          {detailListItems}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

Select.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Select)
);

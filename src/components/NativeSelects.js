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

class NativeSelects extends React.Component {
  render() {
    const {
      classes,
      activityList,
      detailList,
      activity,
      detail,
      handleActivityChange,
      handleDetailChange
    } = this.props;

    const activityNameListItems = activityList.map(item => {
      return (
        <option value={item.title} key={item.id}>
          {item.title}
        </option>
      );
    });
    const detailNameListItems = detailList.map(item => {
      return (
        <option value={item.content} key={item.id}>
          {item.content}
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
            onChange={handleActivityChange}
            input={
              <Input name="activity" id="activity-native-label-placeholder" />
            }
          >
            {activityNameListItems}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="detail-native-label-placeholder">
            Detail
          </InputLabel>
          <NativeSelect
            value={detail}
            onChange={handleDetailChange}
            input={<Input name="detail" id="detail-native-label-placeholder" />}
          >
            {detailNameListItems}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NativeSelects);

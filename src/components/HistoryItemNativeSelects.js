import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import Input from "@material-ui/core/Input";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    minWidth: 180
  }
});

function HistoryItemNativeSelects(props) {
  const {
    classes,
    activityList,
    detailList,
    activity,
    detail,
    handleActivityChange,
    handleDetailChange
  } = props;

  const activityNameListItems = activityList.map(item => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });
  const detailNameListItems = detailList.map(item => {
    return (
      <option value={item.name} key={item.id}>
        {item.name}
      </option>
    );
  });

  return (
    <React.Fragment>
      <FormControl margin="dense" className={classes.formControl}>
        <InputLabel htmlFor="activity-native-label-placeholder">
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

      <FormControl margin="dense" className={classes.formControl}>
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
    </React.Fragment>
  );
}

export default withStyles(styles)(HistoryItemNativeSelects);

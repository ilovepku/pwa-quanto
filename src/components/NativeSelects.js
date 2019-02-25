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
  state = {
    activity: "Exercise",
    detail: "Strength"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="activity-native-label-placeholder">
            Activity
          </InputLabel>
          <NativeSelect
            value={this.state.activity}
            onChange={this.handleChange("activity")}
            input={
              <Input name="activity" id="activity-native-label-placeholder" />
            }
          >
            <option value="">None</option>
            <option value="Exercise">Exercise</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="detail-native-label-placeholder">
            Detail
          </InputLabel>
          <NativeSelect
            value={this.state.detail}
            onChange={this.handleChange("detail")}
            input={<Input name="detail" id="detail-native-label-placeholder" />}
          >
            <option value="">None</option>
            <option value="Strength">Strength</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
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

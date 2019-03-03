import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DateTimePicker from "./DateTimePicker";
import NativeSelects from "./NativeSelects";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "50%"
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20,
  }
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<CreateIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              2019/02/24 14:00
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Exercise: Strength
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <DateTimePicker />
          </div>
          <div className={classes.column}>
            <NativeSelects />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Delete
            <DeleteIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Split
            <CallSplitIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
          >
            Save
            <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<CreateIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              2019/02/24 14:00
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Exercise: Strength
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <DateTimePicker />
          </div>
          <div className={classes.column}>
            <NativeSelects />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Delete
            <DeleteIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Split
            <CallSplitIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
          >
            Save
            <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<CreateIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              2019/02/24 14:00
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Exercise: Strength
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <DateTimePicker />
          </div>
          <div className={classes.column}>
            <NativeSelects />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Delete
            <DeleteIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Split
            <CallSplitIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
          >
            Save
            <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<CreateIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>
              2019/02/24 14:00
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Exercise: Strength
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <DateTimePicker />
          </div>
          <div className={classes.column}>
            <NativeSelects />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Delete
            <DeleteIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Split
            <CallSplitIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
          >
            Save
            <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailedExpansionPanel);

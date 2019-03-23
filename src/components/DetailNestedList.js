import React from "react";

import { connect } from "react-redux";
import { deleteActivityName, deleteDetailName } from "../redux/actions";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import { Droppable, Draggable } from "react-beautiful-dnd";

import classNames from "classnames";

import ActivityListInput from "./ActivityListInput";

const mapDispatchToProps = dispatch => {
  return {
    deleteActivityName: payload => dispatch(deleteActivityName(payload)),
    deleteDetailName: payload => dispatch(deleteDetailName(payload))
  };
};

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

class DetailNestedList extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      classes,
      index,
      activity,
      details,
      deleteActivityName,
      deleteDetailName
    } = this.props;
    return (
      <Draggable draggableId={activity.id} index={index}>
        {outterProvided => (
          <div {...outterProvided.draggableProps} ref={outterProvided.innerRef}>
            <Droppable droppableId={activity.id} type="detail">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon
                      {...outterProvided.dragHandleProps}
                      aria-label="Drag"
                    >
                      <DragIndicatorIcon />
                    </ListItemIcon>

                    <ActivityListInput item={activity} />

                    <ListItemIcon>
                      <DeleteIcon
                        onClick={() => deleteActivityName(activity.id)}
                      />
                    </ListItemIcon>

                    {this.state.open ? (
                      <ExpandLess onClick={this.handleClick} />
                    ) : (
                      <ExpandMore onClick={this.handleClick} />
                    )}
                  </ListItem>

                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                      {details.map((detail, index) => (
                        <Draggable
                          key={detail.id}
                          draggableId={detail.id}
                          index={index}
                        >
                          {provided => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <ListItem
                                className={classNames(
                                  classes.nested,
                                  classes.listItem
                                )}
                              >
                                <ListItemIcon
                                  {...provided.dragHandleProps}
                                  aria-label="Drag"
                                >
                                  <DragIndicatorIcon />
                                </ListItemIcon>

                                <ActivityListInput
                                  item={detail}
                                  activityId={activity.id}
                                />

                                <ListItemIcon aria-label="Delete">
                                  <DeleteIcon
                                    onClick={() =>
                                      deleteDetailName({
                                        activityId: activity.id,
                                        detailId: detail.id
                                      })
                                    }
                                  />
                                </ListItemIcon>
                              </ListItem>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}

                      {/* the listItem to add a new detail */}
                      <ListItem
                        className={classNames(classes.nested, classes.listItem)}
                      >
                        <ListItemIcon>
                          <AddIcon />
                        </ListItemIcon>
                        <ActivityListInput
                          item={{ id: null, name: null }} // pass in empty object to add a new detail
                          activityId={activity.id}
                        />
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(DetailNestedList)
);

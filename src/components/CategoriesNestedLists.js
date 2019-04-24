import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  deleteActivityName,
  deleteDetailName,
  enqueueSnackbar
} from "../redux/actions";

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

import CategoriesInput from "./CategoriesInput";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { deleteActivityName, deleteDetailName, enqueueSnackbar },
    dispatch
  );

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

const getItemStyle = isDragging => ({
  ...(isDragging && {
    background: "lightgrey"
  })
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white"
});

class CategoriesNestedLists extends Component {
  state = {
    nestedListOpen: false
  };

  handleNestedListOpen = () => {
    this.setState(state => ({ nestedListOpen: !state.nestedListOpen }));
  };

  render() {
    const {
      classes,
      index,
      activity,
      details,
      deleteActivityName,
      deleteDetailName,
      enqueueSnackbar
    } = this.props;
    const { nestedListOpen } = this.state;
    return (
      <Draggable draggableId={activity.id} index={index}>
        {(outterProvided, outterSnapshot) => (
          <div {...outterProvided.draggableProps} ref={outterProvided.innerRef}>
            <Droppable droppableId={activity.id} type="detail">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <ListItem
                    divider
                    className={classes.listItem}
                    style={getItemStyle(outterSnapshot.isDragging)}
                  >
                    <ListItemIcon
                      {...outterProvided.dragHandleProps}
                      aria-label="Drag"
                    >
                      <DragIndicatorIcon />
                    </ListItemIcon>

                    <CategoriesInput item={activity} />

                    <ListItemIcon>
                      <DeleteIcon
                        onClick={() => {
                          deleteActivityName(activity.id);
                          enqueueSnackbar({
                            message: "Activity name removed.",
                            options: {
                              variant: "success"
                            }
                          });
                        }}
                      />
                    </ListItemIcon>

                    {nestedListOpen ? (
                      <ExpandLess onClick={this.handleNestedListOpen} />
                    ) : (
                      <ExpandMore onClick={this.handleNestedListOpen} />
                    )}
                  </ListItem>

                  <Collapse in={nestedListOpen} timeout="auto" unmountOnExit>
                    <List>
                      {details.map((detail, index) => (
                        <Draggable
                          key={detail.id}
                          draggableId={detail.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <ListItem
                                divider
                                className={classNames(
                                  classes.nested,
                                  classes.listItem
                                )}
                                style={getItemStyle(snapshot.isDragging)}
                              >
                                <ListItemIcon
                                  {...provided.dragHandleProps}
                                  aria-label="Drag"
                                >
                                  <DragIndicatorIcon />
                                </ListItemIcon>

                                <CategoriesInput
                                  item={detail}
                                  activityId={activity.id}
                                />

                                <ListItemIcon aria-label="Delete">
                                  <DeleteIcon
                                    onClick={() => {
                                      deleteDetailName({
                                        activityId: activity.id,
                                        detailId: detail.id
                                      });
                                      enqueueSnackbar({
                                        message: "Detail name removed.",
                                        options: {
                                          variant: "success"
                                        }
                                      });
                                    }}
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
                        divider
                        className={classNames(classes.nested, classes.listItem)}
                      >
                        <ListItemIcon>
                          <AddIcon />
                        </ListItemIcon>
                        <CategoriesInput
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
  )(CategoriesNestedLists)
);

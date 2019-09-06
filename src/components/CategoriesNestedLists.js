// react
import React, { useState, useContext } from "react";
import { CategoriesContext } from "../contexts/categoriesContext";
import { SnackbarContext } from "../contexts/snackbarContext";
import {
  DELETE_ACTIVITY_NAME,
  DELETE_DETAIL_NAME,
  OPEN_SNACKBAR
} from "../contexts/constants";

// material ui
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

// libs
import { Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

// components
import CategoriesInput from "./CategoriesInput";

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    background: "linear-gradient(75deg, #F9FCFF 0%, #EBEBEB 74%)",
    boxShadow: "10px 5px 15px #e5e6eb"
  },
  dragIcon: {
    fill: "#857541"
  },
  deleteIcon: {
    fill: "#6a6c6e"
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

const CategoriesNestedLists = props => {
  const { classes, index, activity, details } = props;
  const [nestedListOpen, setNestedListOpen] = useState(false);
  const { dispatch } = useContext(CategoriesContext);
  const snackbarContext = useContext(SnackbarContext);
  const toggleNestedListOpen = () => {
    setNestedListOpen(!nestedListOpen);
  };
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
                  classes={{ root: classes.listItem }}
                  style={getItemStyle(outterSnapshot.isDragging)}
                >
                  <ListItemIcon
                    {...outterProvided.dragHandleProps}
                    aria-label="Drag"
                  >
                    <DragIndicatorIcon classes={{ root: classes.dragIcon }} />
                  </ListItemIcon>

                  <CategoriesInput item={activity} />

                  <ListItemIcon>
                    <DeleteIcon
                      onClick={() => {
                        dispatch({
                          type: DELETE_ACTIVITY_NAME,
                          payload: activity.id
                        });
                        snackbarContext.dispatch({
                          type: OPEN_SNACKBAR,
                          payload: {
                            msg: "Activity name removed.",
                            variant: "success"
                          }
                        });
                      }}
                      classes={{ root: classes.deleteIcon }}
                    />
                  </ListItemIcon>

                  {nestedListOpen ? (
                    <ExpandLess onClick={toggleNestedListOpen} />
                  ) : (
                    <ExpandMore onClick={toggleNestedListOpen} />
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
                              className={clsx(classes.nested, classes.listItem)}
                              style={getItemStyle(snapshot.isDragging)}
                            >
                              <ListItemIcon
                                {...provided.dragHandleProps}
                                aria-label="Drag"
                              >
                                <DragIndicatorIcon
                                  classes={{ root: classes.dragIcon }}
                                />
                              </ListItemIcon>

                              <CategoriesInput
                                item={detail}
                                activityId={activity.id}
                              />

                              <ListItemIcon aria-label="Delete">
                                <DeleteIcon
                                  onClick={() => {
                                    dispatch({
                                      type: DELETE_DETAIL_NAME,
                                      payload: {
                                        activityId: activity.id,
                                        detailId: detail.id
                                      }
                                    });
                                    snackbarContext.dispatch({
                                      type: OPEN_SNACKBAR,
                                      payload: {
                                        msg: "Detail name removed.",
                                        variant: "success"
                                      }
                                    });
                                  }}
                                  classes={{ root: classes.deleteIcon }}
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
                      className={clsx(classes.nested, classes.listItem)}
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
};

export default withStyles(styles)(CategoriesNestedLists);

// react
import React, { useState, useContext } from "react";

// contexts
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import {
  deleteActivityName,
  deleteDetailName
} from "../../contexts/categories/categories.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, Collapse, Box } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

// libs
import { Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

// components
import CategoryInput from "../category-input/category-input.component";

const useStyles = makeStyles(theme => ({
  listItem: {
    /* background: "linear-gradient(75deg, #F9FCFF 0%, #EBEBEB 74%)",
    boxShadow: "10px 5px 15px #e5e6eb" */
  },
  nestedListItem: {
    paddingLeft: theme.spacing(4)
  },
  listItemIcon: {
    minWidth: theme.spacing(3),
    padding: theme.spacing(1)
  },
  dragIcon: {
    /* fill: "#857541" */
  }
}));

const getItemStyle = isDragging => ({
  ...(isDragging && {
    background: "lightgrey"
  })
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white"
});

const CategoriesNestedLists = ({ index, activity, details }) => {
  const classes = useStyles();
  const [nestedListOpen, setNestedListOpen] = useState(false);
  const { dispatchCategories } = useContext(CategoriesContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  const toggleNestedListOpen = () => {
    setNestedListOpen(!nestedListOpen);
  };
  return (
    <Draggable draggableId={activity.id} index={index}>
      {(outterProvided, outterSnapshot) => (
        <Box {...outterProvided.draggableProps} ref={outterProvided.innerRef}>
          <Droppable droppableId={activity.id} type="detail">
            {(provided, snapshot) => (
              <Box
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
                    className={classes.listItemIcon}
                  >
                    <DragIndicatorIcon className={classes.dragIcon} />
                  </ListItemIcon>

                  <CategoryInput item={activity} />

                  <ListItemIcon className={classes.listItemIcon}>
                    <DeleteIcon
                      onClick={() => {
                        dispatchCategories(deleteActivityName(activity.id));
                        dispatchSnackbar(
                          openSnackbar({
                            msg: "Activity name removed.",
                            variant: "success"
                          })
                        );
                      }}
                    />
                  </ListItemIcon>

                  <ListItemIcon className={classes.listItemIcon}>
                    {nestedListOpen ? (
                      <ExpandLessIcon onClick={toggleNestedListOpen} />
                    ) : (
                      <ExpandMoreIcon onClick={toggleNestedListOpen} />
                    )}
                  </ListItemIcon>
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
                          <Box
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <ListItem
                              divider
                              className={clsx(
                                classes.nestedListItem,
                                classes.listItem
                              )}
                              style={getItemStyle(snapshot.isDragging)}
                            >
                              <ListItemIcon
                                {...provided.dragHandleProps}
                                className={classes.listItemIcon}
                              >
                                <DragIndicatorIcon
                                  className={classes.dragIcon}
                                />
                              </ListItemIcon>

                              <CategoryInput
                                item={detail}
                                activityId={activity.id}
                              />

                              <ListItemIcon className={classes.listItemIcon}>
                                <DeleteIcon
                                  onClick={() => {
                                    dispatchCategories(
                                      deleteDetailName({
                                        activityId: activity.id,
                                        detailId: detail.id
                                      })
                                    );
                                    dispatchSnackbar(
                                      openSnackbar({
                                        msg: "Detail name removed.",
                                        variant: "success"
                                      })
                                    );
                                  }}
                                  className={classes.deleteIcon}
                                />
                              </ListItemIcon>
                            </ListItem>
                          </Box>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}

                    {/* the listItem to add a new detail */}
                    <ListItem
                      divider
                      className={clsx(classes.nestedListItem, classes.listItem)}
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <AddIcon />
                      </ListItemIcon>
                      <CategoryInput
                        item={{ id: null, name: null }} // pass in empty object to add a new detail
                        activityId={activity.id}
                      />
                    </ListItem>
                  </List>
                </Collapse>
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
};

export default CategoriesNestedLists;

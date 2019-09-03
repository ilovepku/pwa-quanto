// react
import React, { useContext } from "react";
import { CategoriesContext } from "../contexts/categoriesContext";

// material ui
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";

// react-beautiful-dnd
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// components
import CategoriesNestedLists from "./CategoriesNestedLists";
import CategoriesInput from "./CategoriesInput";

const styles = () => ({
  view: {
    paddingBottom: "110px"
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

function CategoriesTabView(props) {
  const { categories, dispatch } = useContext(CategoriesContext);
  const { classes } = props;
  return (
    <DragDropContext
      onDragEnd={payload => dispatch({ type: "REORDER_CATEGORIES", payload })}
    >
      <Droppable
        droppableId="all-activities"
        direction="vertical"
        type="activity"
      >
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.view}
          >
            <List>
              {categories.activityIds.map((activityId, index) => {
                const activity = categories.activities[activityId];
                const details = activity.detailIds.map(
                  detailId => categories.details[detailId]
                );

                return (
                  <CategoriesNestedLists
                    key={activity.id}
                    activity={activity}
                    details={details}
                    index={index}
                  />
                );
              })}

              {provided.placeholder}

              {/* the listItem to add a new activity */}
              <ListItem className={classes.listItem} divider>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <CategoriesInput
                  item={{ id: null, name: null, detailIds: [] }} // pass in empty object to add a new activity
                />
              </ListItem>
            </List>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default withStyles(styles)(CategoriesTabView);

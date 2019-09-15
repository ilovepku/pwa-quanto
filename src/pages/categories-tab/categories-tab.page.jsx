// react
import React, { useContext } from "react";

// contexts
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { reorderCategories } from "../../contexts/categories/categories.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";

// libs
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// components
import CategoriesNestedLists from "../../components/categories-nested-lists/categories-nested-lists.component";
import CategoryInput from "../../components/category-input/category-input.component";

const useStyles = makeStyles(theme => ({
  view: {
    paddingBottom: "110px"
  },
  listItem: { // duplicate styles
    paddingLeft: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0
  }
}));

function CategoriesTab() {
  const classes = useStyles();
  const { categories, dispatchCategories } = useContext(CategoriesContext);
  return (
    <DragDropContext
      onDragEnd={payload => dispatchCategories(reorderCategories(payload))}
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
                <CategoryInput
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

export default CategoriesTab;

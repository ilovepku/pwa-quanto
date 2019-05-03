import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import AddIcon from "@material-ui/icons/Add";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import CategoriesNestedLists from "./CategoriesNestedLists";
import CategoriesInput from "./CategoriesInput";

import { reorderCategories } from "../redux/actions";

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reorderCategories: payload => dispatch(reorderCategories(payload))
  };
};

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
  const { classes, categories, reorderCategories } = props;
  return (
    <DragDropContext onDragEnd={reorderCategories}>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoriesTabView)
);

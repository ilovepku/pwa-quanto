import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import AddIcon from "@material-ui/icons/Add";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import DetailNestedList from "./DetailNestedList";
import ActivityListInput from "./ActivityListInput";

import { reorderActivityList } from "../redux/actions";

const mapStateToProps = state => {
  return {
    fullActivityList: state.fullActivityList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reorderActivityList: payload => dispatch(reorderActivityList(payload))
  };
};

const styles = () => ({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  view: {
    marginBottom: "100px"
  }
});

function CategoriesTabView(props) {
  const { classes, fullActivityList, reorderActivityList } = props;
  return (
    <DragDropContext onDragEnd={reorderActivityList}>
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
              {fullActivityList.activityIds.map((activityId, index) => {
                const activity = fullActivityList.activities[activityId];
                const details = activity.detailIds.map(
                  detailId => fullActivityList.details[detailId]
                );

                return (
                  <DetailNestedList
                    key={activity.id}
                    activity={activity}
                    details={details}
                    index={index}
                  />
                );
              })}

              {provided.placeholder}

              {/* the listItem to add a new activity */}
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ActivityListInput
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

import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import NestedListItem from "./NestedListItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { reorderActivityList } from "../actions";

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

class ActivityList extends React.Component {
  render() {
    const { fullActivityList, reorderActivityList } = this.props;
    return (
      <DragDropContext onDragEnd={reorderActivityList}>
        <Droppable
          droppableId="all-activities"
          direction="vertical"
          type="activity"
        >
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <List component="nav">
                {fullActivityList.activityOrder.map((activityId, index) => {
                  const activity = fullActivityList.activities[activityId];
                  const details = activity.detailIds.map(
                    detailId => fullActivityList.details[detailId]
                  );

                  return (
                    <NestedListItem
                      key={activity.id}
                      activity={activity}
                      details={details}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </List>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList);

import React from "react";
import { connect } from "react-redux";
import Column from "./Column";
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
              {fullActivityList.activityOrder.map((activityId, index) => {
                const activity = fullActivityList.activities[activityId];
                const details = activity.detailIds.map(
                  detailId => fullActivityList.details[detailId]
                );

                return (
                  <Column
                    key={activity.id}
                    activity={activity}
                    details={details}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
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

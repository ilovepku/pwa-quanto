import React from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import initialActivityList from "../initialActivityList";

class ActivityList extends React.Component {
  state = initialActivityList;

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "activity") {
      const newActivityOrder = Array.from(this.state.activityOrder);
      newActivityOrder.splice(source.index, 1);
      newActivityOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.sate,
        activityOrder: newActivityOrder
      };
      this.setState(newState);
      return;
    }

    const start = this.state.activities[source.droppableId];
    const finish = this.state.activities[destination.droppableId];

    // moving within the same activity
    if (start === finish) {
      const newDetailIds = Array.from(start.detailIds);
      newDetailIds.splice(source.index, 1);
      newDetailIds.splice(destination.index, 0, draggableId);

      const newActivity = {
        ...start,
        detailIds: newDetailIds
      };

      const newState = {
        ...this.state,
        activities: {
          ...this.state.activities,
          [newActivity.id]: newActivity
        }
      };

      this.setState(newState);
      return;
    }

    // moving from one activity to another
    const startDetailIds = Array.from(start.detailIds);
    startDetailIds.splice(source.index, 1);
    const newStart = {
      ...start,
      detailIds: startDetailIds
    };

    const finishDetailIds = Array.from(finish.detailIds);
    finishDetailIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      detailIds: finishDetailIds
    };

    const newState = {
      ...this.state,
      activities: {
        ...this.state.activities,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-activities"
          direction="vertical"
          type="activity"
        >
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.activityOrder.map((activityId, index) => {
                const activity = this.state.activities[activityId];
                const details = activity.detailIds.map(
                  detailId => this.state.details[detailId]
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

export default ActivityList;

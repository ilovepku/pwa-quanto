import nanoid from "nanoid";
import initialCategories from "../../data/initialCategories";

import CategoriesActionTypes from "./categories.types";

export const categoriesReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case CategoriesActionTypes.EDIT_ACTIVITY_NAME:
      let activityId = action.payload.activityId;
      let newActivityIds = state.activityIds.slice();

      // prepare to add new activity if activityId is empty
      if (!activityId) {
        activityId = "activity-" + nanoid(10);
        newActivityIds.push(activityId);
      }

      newState = {
        ...state,
        activityIds: newActivityIds,
        activities: {
          ...state.activities,
          [activityId]: {
            id: activityId,
            name: action.payload.name,
            detailIds: !action.payload.activityId
              ? []
              : state.activities[activityId].detailIds
          }
        }
      };
      return newState;

    case CategoriesActionTypes.EDIT_DETAIL_NAME:
      let detailId = action.payload.detailId;
      let newDetailIds = state.activities[
        action.payload.activityId
      ].detailIds.slice();

      // prepare to add new detail if activityId is empty
      if (!detailId) {
        detailId = "detail-" + nanoid(10);
        newDetailIds.push(detailId);
      }

      newState = {
        ...state,
        details: {
          ...state.details,
          [detailId]: {
            id: detailId,
            name: action.payload.name
          }
        },
        activities: {
          ...state.activities,
          [action.payload.activityId]: {
            ...state.activities[action.payload.activityId],
            detailIds: newDetailIds
          }
        }
      };
      return newState;

    case CategoriesActionTypes.DELETE_ACTIVITY_NAME:
      newState = {
        ...state,
        activityIds: state.activityIds.filter(item => item !== action.payload)
      };

      // delete details related to activity to be deleted
      newState.activities[action.payload].detailIds.forEach(item => {
        delete newState.details[item];
      });

      delete newState.activities[action.payload];
      return newState;

    case CategoriesActionTypes.DELETE_DETAIL_NAME:
      newState = {
        ...state,
        activities: {
          ...state.activities,
          [action.payload.activityId]: {
            ...state.activities[action.payload.activityId],
            detailIds: state.activities[
              action.payload.activityId
            ].detailIds.filter(item => item !== action.payload.detailId)
          }
        }
      };
      delete newState.details[action.payload.detailId];
      return newState;

    case CategoriesActionTypes.REORDER_CATEGORIES:
      const { destination, source, draggableId, type } = action.payload;

      // check for no changes
      if (!destination) {
        return state;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return state;
      }

      // reording activities
      if (type === "activity") {
        const newactivityIds = Array.from(state.activityIds);
        newactivityIds.splice(source.index, 1);
        newactivityIds.splice(destination.index, 0, draggableId);

        newState = {
          ...state,
          activityIds: newactivityIds
        };
        return newState;
      }

      // reording details
      const start = state.activities[source.droppableId];
      const finish = state.activities[destination.droppableId];

      // moving detailswithin the same activity
      if (start === finish) {
        const newDetailIds = Array.from(start.detailIds);
        newDetailIds.splice(source.index, 1);
        newDetailIds.splice(destination.index, 0, draggableId);

        const newActivity = {
          ...start,
          detailIds: newDetailIds
        };

        newState = {
          ...state,
          activities: {
            ...state.activities,
            [newActivity.id]: newActivity
          }
        };

        return newState;
      }

      // moving details from one activity to another
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

      newState = {
        ...state,
        activities: {
          ...state.activities,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };

      return newState;

    case CategoriesActionTypes.DEFAULT_CATEGORIES:
      return initialCategories;

    case CategoriesActionTypes.RESTORE_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};

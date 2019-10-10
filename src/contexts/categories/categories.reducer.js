import nanoid from "nanoid";
import initialCategories from "../../data/initialCategories";

import CategoriesActionTypes from "./categories.types";

export const categoriesReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case CategoriesActionTypes.EDIT_ACTIVITY_NAME:
      let activityId = action.payload.activityId;
      const newActivityIds = [...state.activityIds];

      // prepare to add new activity if activityId is empty
      if (!activityId) {
        activityId = "activity-" + nanoid(10);
        newActivityIds.push(activityId);
      }

      return {
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

    case CategoriesActionTypes.EDIT_DETAIL_NAME:
      let detailId = action.payload.detailId;
      const newDetailIds = [
        ...state.activities[action.payload.activityId].detailIds
      ];

      // prepare to add new detail if activityId is empty
      if (!detailId) {
        detailId = "detail-" + nanoid(10);
        newDetailIds.push(detailId);
      }

      return {
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
      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return state;
      }

      // reording activities
      if (type === "activity") {
        const newactivityIds = Array.from(state.activityIds);
        newactivityIds.splice(source.index, 1);
        newactivityIds.splice(destination.index, 0, draggableId);

        return {
          ...state,
          activityIds: newactivityIds
        };
      }

      // reording details
      const start = state.activities[source.droppableId];
      const finish = state.activities[destination.droppableId];

      // moving details within the same activity
      if (start === finish) {
        const newDetailIds = Array.from(start.detailIds);
        newDetailIds.splice(source.index, 1);
        newDetailIds.splice(destination.index, 0, draggableId);

        const newActivity = {
          ...start,
          detailIds: newDetailIds
        };

        return {
          ...state,
          activities: {
            ...state.activities,
            [newActivity.id]: newActivity
          }
        };
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

      return {
        ...state,
        activities: {
          ...state.activities,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };

    case CategoriesActionTypes.DEFAULT_CATEGORIES:
      return initialCategories;

    case CategoriesActionTypes.RESTORE_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
import nanoid from "nanoid";

import CategoriesActionTypes from "./categories.types";

import initialCategories from "../../data/initialCategories";

const categoriesReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case CategoriesActionTypes.ADD_ACTIVITY_NAME:
      const newActivityId = "activity-" + nanoid(10);
      return {
        ...state,
        activityIds: [...state.activityIds, newActivityId],
        activities: {
          ...state.activities,
          [newActivityId]: {
            id: newActivityId,
            name: action.payload,
            detailIds: []
          }
        }
      };

    case CategoriesActionTypes.EDIT_ACTIVITY_NAME:
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.payload.activityId]: {
            ...state.activities[action.payload.activityId],
            name: action.payload.name
          }
        }
      };

    case CategoriesActionTypes.DELETE_ACTIVITY_NAME:
      // remove activityId
      newState = {
        ...state,
        activityIds: state.activityIds.filter(item => item !== action.payload)
      };

      // remove details related to activity to be deleted
      newState.activities[action.payload].detailIds.forEach(item => {
        delete newState.details[item];
      });

      // remove activity
      delete newState.activities[action.payload];
      return newState;

    case CategoriesActionTypes.ADD_DETAIL_NAME:
      const newDetailId = "detail-" + nanoid(10);
      return {
        ...state,
        details: {
          ...state.details,
          [newDetailId]: {
            id: newDetailId,
            name: action.payload.name
          }
        },
        activities: {
          ...state.activities,
          [action.payload.activityId]: {
            ...state.activities[action.payload.activityId],
            detailIds: [
              ...state.activities[action.payload.activityId].detailIds,
              newDetailId
            ]
          }
        }
      };

    case CategoriesActionTypes.EDIT_DETAIL_NAME:
      return {
        ...state,
        details: {
          ...state.details,
          [action.payload.detailId]: {
            ...state.details[action.payload.detailId],
            name: action.payload.name
          }
        }
      };

    case CategoriesActionTypes.DELETE_DETAIL_NAME:
      // remove detailId in activity
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
      // remove detail
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
        const newActivityIds = [...state.activityIds];
        newActivityIds.splice(source.index, 1);
        newActivityIds.splice(destination.index, 0, draggableId);

        return {
          ...state,
          activityIds: newActivityIds
        };
      }

      // reording details
      if (source.droppableId === destination.droppableId) {
        // moving details within the same activity
        const startActivity = state.activities[source.droppableId];
        const newDetailIds = [...startActivity.detailIds];
        newDetailIds.splice(source.index, 1);
        newDetailIds.splice(destination.index, 0, draggableId);

        return {
          ...state,
          activities: {
            ...state.activities,
            [startActivity.id]: {
              ...startActivity,
              detailIds: newDetailIds
            }
          }
        };
      } else {
        // moving details from one activity to another
        const startActivity = state.activities[source.droppableId];
        const finishActivity = state.activities[destination.droppableId];
        const startDetailIds = [...startActivity.detailIds];
        startDetailIds.splice(source.index, 1);
        const finishDetailIds = [...finishActivity.detailIds];
        finishDetailIds.splice(destination.index, 0, draggableId);

        return {
          ...state,
          activities: {
            ...state.activities,
            [startActivity.id]: {
              ...startActivity,
              detailIds: startDetailIds
            },
            [finishActivity.id]: {
              ...finishActivity,
              detailIds: finishDetailIds
            }
          }
        };
      }

    case CategoriesActionTypes.DEFAULT_CATEGORIES:
      return initialCategories;

    case CategoriesActionTypes.RESTORE_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};

export default categoriesReducer;

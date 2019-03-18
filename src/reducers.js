import {
  /* SET_ACTIVITY_DATETIME,
  SET_ACTIVITY,
  SET_DETAIL, */
  SAVE_ACTIVITY,
  SPLIT_ACTIVITY,
  DELETE_ACTIVITY,
  ADD_TO_HISTORY,
  REORDER_ACTIVITY_LIST,
  UPDATE_STATE
} from "./constants.js";
import CacheManager from "./cache";
import initialActivityList from "./initialActivityList";

const cache = new CacheManager();

// find default activity and detail names
const defaultActivityId = initialActivityList.activityOrder[0];
const defaultActivity = initialActivityList.activities[defaultActivityId];
const defaultActivityName = defaultActivity.title;
const defaultDetailId = defaultActivity.detailIds[0];
const defaultDetail = initialActivityList.details[defaultDetailId];
const defaultDetailName = defaultDetail.content;

const initialStateHistory = {
  fullActivityList: initialActivityList,
  history: [
    {
      datetime: new Date(),
      activity: defaultActivityName,
      detail: defaultDetailName
    }
  ]
};

export const rootReducer = (state = initialStateHistory, action = {}) => {
  let newState;
  switch (action.type) {
    case ADD_TO_HISTORY:
      newState = {
        ...state,
        history: [
          ...state.history,
          {
            datetime: new Date(),
            activity: defaultActivityName,
            detail: defaultDetailName
          }
        ]
      };
      cache.writeData("state", newState);
      return newState;
    /* case SET_ACTIVITY_DATETIME:
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            datetime: action.payload.datetime
          };
        })
      };
      cache.writeData("state", newState);
      return newState;
    case SET_ACTIVITY:
      const detail = state.activityNameList.filter(
        item => item.parent === action.payload.activity
      )[0].name;
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            activity: action.payload.activity,
            detail
          };
        })
      };
      cache.writeData("state", newState);
      return newState;
    case SET_DETAIL:
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            detail: action.payload.detail
          };
        })
      };
      cache.writeData("state", newState);
      return newState; */
    case SAVE_ACTIVITY:
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            datetime: action.payload.datetime,
            activity: action.payload.activity,
            detail: action.payload.detail
          };
        })
      };
      cache.writeData("state", newState);
      return newState;
    case SPLIT_ACTIVITY:
      newState = {
        ...state,
        history: [
          ...state.history.slice(0, action.payload.index + 1),
          {
            datetime: action.payload.datetime,
            activity: action.payload.activity,
            detail: action.payload.detail
          },
          ...state.history.slice(action.payload.index + 1)
        ]
      };
      cache.writeData("state", newState);
      return newState;
    case DELETE_ACTIVITY:
      newState = {
        ...state,
        history: state.history.filter((item, index) => index !== action.payload)
      };
      cache.writeData("state", newState);
      return newState;

    case REORDER_ACTIVITY_LIST:
      const { destination, source, draggableId, type } = action.payload;

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
        const newActivityOrder = Array.from(
          state.fullActivityList.activityOrder
        );
        newActivityOrder.splice(source.index, 1);
        newActivityOrder.splice(destination.index, 0, draggableId);

        newState = {
          ...state,
          fullActivityList: {
            ...state.fullActivityList,
            activityOrder: newActivityOrder
          }
        };
        cache.writeData("state", newState);
        return newState;
      }

      const start = state.fullActivityList.activities[source.droppableId];
      const finish = state.fullActivityList.activities[destination.droppableId];

      // moving within the same activity
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
          fullActivityList: {
            ...state.fullActivityList,
            activities: {
              ...state.fullActivityList.activities,
              [newActivity.id]: newActivity
            }
          }
        };

        cache.writeData("state", newState);
        return newState;
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

      newState = {
        ...state,
        fullActivityList: {
          ...state.fullActivityList,
          activities: {
            ...state.fullActivityList.activities,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
          }
        }
      };

      cache.writeData("state", newState);
      return newState;

    case UPDATE_STATE:
      return action.payload;
    default:
      return state;
  }
};

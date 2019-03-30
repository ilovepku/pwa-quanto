import nanoid from "nanoid";

import { duration2HHMM } from "../global/duration2HHMM";

import {
  /* SET_ACTIVITY_DATETIME,
  SET_ACTIVITY,
  SET_DETAIL, */
  SAVE_ACTIVITY,
  SPLIT_ACTIVITY,
  DELETE_ACTIVITY,
  ADD_TO_HISTORY,
  ADD_INTERRUPTION,
  EDIT_ACTIVITY_NAME,
  EDIT_DETAIL_NAME,
  DELETE_ACTIVITY_NAME,
  DELETE_DETAIL_NAME,
  REORDER_ACTIVITY_LIST,
  UPDATE_STATE,
  DISPLAY_NOTIFICATION
} from "./constants.js";

import initialActivityList from "../data/initialActivityList";

import CacheManager from "../global/cache";
const cache = new CacheManager();

const initialStateHistory = {
  fullActivityList: initialActivityList,
  history: []
};

// Todo: seperate history and activityList into 2 reducers?
export const rootReducer = (state = initialStateHistory, action = {}) => {
  let newState;
  switch (action.type) {
    case ADD_TO_HISTORY:
      // find default activity and detail names
      const defaultActivityId = state.fullActivityList.activityIds[0];
      const defaultActivity =
        state.fullActivityList.activities[defaultActivityId];
      const defaultActivityName = defaultActivity.name;
      const defaultDetailId = defaultActivity.detailIds[0];
      const defaultDetail = state.fullActivityList.details[defaultDetailId];
      const defaultDetailName = defaultDetail.name;

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

    case ADD_INTERRUPTION:
      if (
        // if current activity is interruption, ends interruption
        state.history.length &&
        state.history[state.history.length - 1].activity === "Interruption"
      ) {
        newState = {
          ...state,
          history: [
            ...state.history,
            {
              datetime: new Date(),
              activity: state.history[state.history.length - 2].activity,
              detail: state.history[state.history.length - 2].detail
            }
          ]
        };
      } else {
        // if current activity is not interruption, starts interruption
        newState = {
          ...state,
          history: [
            ...state.history,
            {
              datetime: new Date(),
              activity: "Interruption",
              detail: "-"
            }
          ]
        };
      }

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
      if (state.history.length !== 1) {
        // check for deleting last item
        newState = {
          ...state,
          history: state.history.filter(
            (item, index) => index !== action.payload
          )
        };
        cache.writeData("state", newState);
        return newState;
      } else {
        return state;
      }

    case EDIT_ACTIVITY_NAME:
      let activityId = action.payload.activityId;
      let newActivityIds = state.fullActivityList.activityIds.slice();

      // prepare to add new activity if activityId is empty
      if (!activityId) {
        activityId = "activity-" + nanoid(10);
        newActivityIds.push(activityId);
      }

      newState = {
        ...state,
        fullActivityList: {
          ...state.fullActivityList,
          activityIds: newActivityIds,
          activities: {
            ...state.fullActivityList.activities,
            [activityId]: {
              id: activityId,
              name: action.payload.name,
              detailIds: !action.payload.activityId
                ? []
                : state.fullActivityList.activities[activityId].detailIds
            }
          }
        }
      };
      cache.writeData("state", newState);
      return newState;

    case EDIT_DETAIL_NAME:
      let detailId = action.payload.detailId;
      let newDetailIds = state.fullActivityList.activities[
        action.payload.activityId
      ].detailIds.slice();

      // prepare to add new detail if activityId is empty
      if (!detailId) {
        detailId = "detail-" + nanoid(10);
        newDetailIds.push(detailId);
      }

      newState = {
        ...state,
        fullActivityList: {
          ...state.fullActivityList,
          details: {
            ...state.fullActivityList.details,
            [detailId]: {
              id: detailId,
              name: action.payload.name
            }
          },
          activities: {
            ...state.fullActivityList.activities,
            [action.payload.activityId]: {
              ...state.fullActivityList.activities[action.payload.activityId],
              detailIds: newDetailIds
            }
          }
        }
      };
      cache.writeData("state", newState);
      return newState;

    case DELETE_ACTIVITY_NAME:
      newState = {
        ...state,
        fullActivityList: {
          ...state.fullActivityList,
          activityIds: state.fullActivityList.activityIds.filter(
            item => item !== action.payload
          )
        }
      };

      // delete details related to activity to be deleted
      newState.fullActivityList.activities[action.payload].detailIds.forEach(
        item => {
          delete newState.fullActivityList.details[item];
        }
      );

      delete newState.fullActivityList.activities[action.payload];
      cache.writeData("state", newState);
      return newState;

    case DELETE_DETAIL_NAME:
      newState = {
        ...state,
        fullActivityList: {
          ...state.fullActivityList,
          activities: {
            ...state.fullActivityList.activities,
            [action.payload.activityId]: {
              ...state.fullActivityList.activities[action.payload.activityId],
              detailIds: state.fullActivityList.activities[
                action.payload.activityId
              ].detailIds.filter(item => item !== action.payload.detailId)
            }
          }
        }
      };
      delete newState.fullActivityList.details[action.payload.detailId];
      cache.writeData("state", newState);
      return newState;

    case REORDER_ACTIVITY_LIST:
      const { destination, source, draggableId, type } = action.payload;

      // check for no changes
      if (!destination) {
        return;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // reording activities
      if (type === "activity") {
        const newactivityIds = Array.from(state.fullActivityList.activityIds);
        newactivityIds.splice(source.index, 1);
        newactivityIds.splice(destination.index, 0, draggableId);

        newState = {
          ...state,
          fullActivityList: {
            ...state.fullActivityList,
            activityIds: newactivityIds
          }
        };
        cache.writeData("state", newState);
        return newState;
      }

      // reording details
      const start = state.fullActivityList.activities[source.droppableId];
      const finish = state.fullActivityList.activities[destination.droppableId];

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

    case DISPLAY_NOTIFICATION:
      // get last history item
      const lastHistoryItem = state.history[state.history.length - 1];
      const duration = duration2HHMM(
        Math.floor((new Date() - lastHistoryItem.datetime) / 1000 / 60)
      );

      Notification.requestPermission(result => {
        if (result !== "granted") {
          console.log("no notification permission granted");
        } else {
          if ("serviceWorker" in navigator) {
            var options = {
              body: "Elasped: " + duration,
              timestamp: lastHistoryItem.datetime,
              /* badge: "", */
              icon: "android-chrome-192x192.png",
              tag: "default",
              silent: true,
              actions: [
                {
                  action: "new",
                  title: "New" /* ,
                  icon: "icon-plus-24.png" */
                },
                {
                  action: "interrupt",
                  title:
                    lastHistoryItem.activity === "Interruption"
                      ? "Resume"
                      : "Interrupt" /* ,
                  icon: "icon-pause-24.png" */
                }
              ]
            };

            navigator.serviceWorker.ready.then(swreg => {
              return swreg.showNotification(
                `${lastHistoryItem.activity}: ${lastHistoryItem.detail}`,
                options
              );
            });
          }
        }
      });
      return state;

    default:
      return state;
  }
};

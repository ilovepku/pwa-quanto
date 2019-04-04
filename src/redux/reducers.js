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
  DISPLAY_NOTIFICATION,
  CLEAR_HISTORY,
  DEFAULT_ACTIVITY_LIST
} from "./constants.js";

import initialActivityList from "../data/initialActivityList";

const initialStateHistory = {
  fullActivityList: initialActivityList,
  history: [
    {
      datetime: new Date(),
      activity: "Unclassified",
      detail: "-"
    }
  ]
};

// Todo: seperate history and activityList into 2 reducers?
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
            activity: "Unclassified",
            detail: "-"
          }
        ]
      };
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
      return newState;

    case REORDER_ACTIVITY_LIST:
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

    case CLEAR_HISTORY:
      newState = {
        ...state,
        history: [
          {
            datetime: new Date(),
            activity: "Unclassified",
            detail: "-"
          }
        ]
      };
      return newState;

    case DEFAULT_ACTIVITY_LIST:
      newState = {
        ...state,
        fullActivityList: initialActivityList
      };

      return newState;

    default:
      return state;
  }
};

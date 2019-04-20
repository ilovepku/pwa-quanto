import { duration2HHMM } from "../global/duration2HHMM";

import {
  ADD_ACTIVITY,
  INTERRUPT_ACTIVITY,
  SAVE_ACTIVITY,
  SPLIT_ACTIVITY,
  DELETE_ACTIVITY,
  DISPLAY_NOTIFICATION,
  PURGE_HISTORY,
  RESTORE_HISTORY
} from "./constants.js";

const initialHistory = [
  {
    datetime: new Date(),
    activity: "Unsorted",
    detail: "-"
  }
];

export const historyReducer = (state = initialHistory, action = {}) => {
  let newState;
  switch (action.type) {
    case ADD_ACTIVITY:
      newState = [
        ...state,
        {
          datetime: new Date(),
          activity: "Unsorted",
          detail: "-"
        }
      ];
      return newState;

    case INTERRUPT_ACTIVITY:
      if (
        // if current activity is interruption, ends interruption
        state.length &&
        state[state.length - 1].activity === "Interruption"
      ) {
        newState = [
          ...state,
          {
            datetime: new Date(),
            activity: state[state.length - 2].activity,
            detail: state[state.length - 2].detail
          }
        ];
      } else {
        // if current activity is not interruption, starts interruption
        newState = [
          ...state,
          {
            datetime: new Date(),
            activity: "Interruption",
            detail: "-"
          }
        ];
      }

      return newState;

    case SAVE_ACTIVITY:
      newState = state.map((item, index) => {
        if (index === action.payload.index) {
          return {
            ...item,
            datetime: action.payload.datetime,
            activity: action.payload.activity,
            detail: action.payload.detail
          };
        } else if (index === action.payload.index + 1) {
          return {
            ...item,
            datetime: action.payload.nextItemDatetime
          };
        } else {
          return item;
        }
      });
      return newState;

    case SPLIT_ACTIVITY:
      newState = [
        ...state.slice(0, action.payload.index + 1),
        {
          datetime: action.payload.splitDatetime,
          activity: "Unsorted",
          detail: "-"
        },
        ...state.slice(action.payload.index + 1)
      ];
      return newState;

    case DELETE_ACTIVITY:
      newState = state.filter((item, index) => index !== action.payload);
      console.log(newState);
      if (newState.length === 0) newState = initialHistory;
      return newState;

    case DISPLAY_NOTIFICATION:
      if (Notification.permission === "granted") {
        // get last history item
        const lastHistoryItem = state[state.length - 1];
        const duration = duration2HHMM(
          Math.floor(
            (new Date() - new Date(lastHistoryItem.datetime)) / 1000 / 60
          )
        );

        if ("serviceWorker" in navigator) {
          var options = {
            body: "Elasped: " + duration,
            timestamp: new Date(lastHistoryItem.datetime),
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
      return state;

    case PURGE_HISTORY:
      newState = state.filter(item => {
        return new Date(item.datetime).getTime() >= action.payload;
      });
      if (newState.length === 0) newState = initialHistory;

      return newState;

    case RESTORE_HISTORY:
      return action.payload;

    default:
      return state;
  }
};

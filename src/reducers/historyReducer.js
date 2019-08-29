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

export const historyReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case ADD_ACTIVITY:
      newState = [
        {
          datetime: new Date(),
          activity: "Unsorted",
          detail: "-"
        },
        ...state
      ];
      return newState;

    case INTERRUPT_ACTIVITY:
      if (
        // if current activity is interruption, ends interruption
        state.length &&
        state[0].activity === "Interruption"
      ) {
        newState = [
          {
            datetime: new Date(),
            activity: state[1].activity,
            detail: state[1].detail
          },
          ...state
        ];
      } else {
        // if current activity is not interruption, starts interruption
        newState = [
          {
            datetime: new Date(),
            activity: "Interruption",
            detail: "-"
          },
          ...state
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
        } else if (index === action.payload.index - 1) {
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
        ...state.slice(0, action.payload.index),
        {
          datetime: action.payload.splitDatetime,
          activity: "Unsorted",
          detail: "-"
        },
        ...state.slice(action.payload.index)
      ];
      return newState;

    case DELETE_ACTIVITY:
      newState = state.filter((item, index) => index !== action.payload);
      if (newState.length === 0) newState = initialHistory;
      return newState;

    case DISPLAY_NOTIFICATION:
      if (Notification.permission === "granted") {
        // get last history item
        const lastHistoryItem = state[0];
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

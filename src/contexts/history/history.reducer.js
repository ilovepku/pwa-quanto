import HistoryActionTypes from "./history.types";

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
    case HistoryActionTypes.NEW_ACTIVITY:
      newState = [
        {
          datetime: new Date(),
          activity: "Unsorted",
          detail: "-"
        },
        ...state
      ];
      return newState;

    case HistoryActionTypes.PAUSE_ACTIVITY:
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

    case HistoryActionTypes.SAVE_ACTIVITY:
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

    case HistoryActionTypes.SPLIT_ACTIVITY:
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

    case HistoryActionTypes.DELETE_ACTIVITY:
      newState = state.filter((item, index) => index !== action.payload);
      if (newState.length === 0) newState = initialHistory;
      return newState;

    case HistoryActionTypes.DISPLAY_NOTIFICATION:
      if (Notification.permission === "granted") {

        const lastHistoryItem = state[0];

        if ("serviceWorker" in navigator) {
          var options = {
            body: "Elasped: " + action.payload,
            timestamp: new Date(lastHistoryItem.datetime),
            icon: "android-chrome-192x192.png",
            // badge:
            // image:
            actions: [
              {
                action: "new",
                title: "New",
                icon: "icon-plus-24.png"
              },
              {
                action: "pause",
                title:
                  lastHistoryItem.activity === "Interruption"
                    ? "Resume"
                    : "Interrupt",
                icon: "icon-pause-24.png"
              }
            ],
            tag: "default", // new notification automatically replaces old one with the same tag
            silent: true
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

    case HistoryActionTypes.PURGE_HISTORY:
      newState = state.filter(item => {
        return new Date(item.datetime).getTime() >= action.payload;
      });
      if (newState.length === 0) newState = initialHistory;
      return newState;

    case HistoryActionTypes.RESTORE_HISTORY:
      return action.payload;

    default:
      return state;
  }
};

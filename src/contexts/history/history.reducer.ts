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
      return [
        {
          datetime: new Date(),
          activity: "Unsorted",
          detail: "-"
        },
        ...state
      ];

    case HistoryActionTypes.PAUSE_ACTIVITY:
      return state[0].activity === "Interruption" // if current activity is interruption, ends interruption
        ? [
            {
              datetime: new Date(),
              activity: state[1].activity,
              detail: state[1].detail
            },
            ...state
          ]
        : [
            // if current activity is not interruption, starts interruption
            {
              datetime: new Date(),
              activity: "Interruption",
              detail: "-"
            },
            ...state
          ];

    case HistoryActionTypes.SAVE_ACTIVITY:
      var {
        index,
        datetime,
        activity,
        detail,
        nextItemDatetime
      } = action.payload;
      return state.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            datetime,
            activity,
            detail
          };
        } else if (idx === index - 1) {
          return {
            ...item,
            datetime: nextItemDatetime
          };
        } else {
          return item;
        }
      });

    case HistoryActionTypes.SPLIT_ACTIVITY:
      return [
        ...state.slice(0, action.payload.index),
        {
          datetime: action.payload.splitDatetime,
          activity: "Unsorted",
          detail: "-"
        },
        ...state.slice(action.payload.index)
      ];

    case HistoryActionTypes.DISPLAY_NOTIFICATION:
      if (Notification.permission === "granted") {
        const lastHistoryItem = state[0];

        if ("serviceWorker" in navigator) {
          var options = {
            body: "Elasped: " + action.payload,
            timestamp: new Date(lastHistoryItem.datetime).getTime(),
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

    case HistoryActionTypes.DELETE_ACTIVITY:
      newState = state.filter((item, index) => index !== action.payload);
      return newState.length ? newState : initialHistory;

    case HistoryActionTypes.PURGE_HISTORY:
      newState = state.filter(
        item => new Date(item.datetime).getTime() >= action.payload
      );
      return newState.length ? newState : initialHistory;

    case HistoryActionTypes.RESTORE_HISTORY:
      return action.payload;

    default:
      return state;
  }
};

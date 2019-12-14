import HistoryActionTypes from "./history.types";

export const createUnsortedActivity = (datetime = new Date()) => {
  return {
    datetime,
    activity: "Unsorted",
    detail: "-"
  };
};

const historyReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case HistoryActionTypes.NEW_ACTIVITY:
      return [createUnsortedActivity(), ...state];

    case HistoryActionTypes.PAUSE_ACTIVITY:
      return [
        state[0].activity === "Interruption"
          ? {
              // if current activity is interruption, ends interruption
              datetime: new Date(),
              activity: state[1].activity,
              detail: state[1].detail
            }
          : {
              // if current activity is not interruption, starts interruption
              datetime: new Date(),
              activity: "Interruption",
              detail: "-"
            },
        ...state
      ];

    case HistoryActionTypes.SAVE_ACTIVITY:
      const {
        index,
        datetime,
        activity,
        detail,
        nextItemDatetime
      } = action.payload;
      return state.map((item, idx) => {
        if (idx === index - 1) {
          return {
            ...item,
            datetime: nextItemDatetime
          };
        } else if (idx === index) {
          return {
            ...item,
            datetime,
            activity,
            detail
          };
        } else {
          return item;
        }
      });

    case HistoryActionTypes.SPLIT_ACTIVITY:
      return [
        ...state.slice(0, action.payload.index),
        createUnsortedActivity(action.payload.splitDatetime),
        ...state.slice(action.payload.index)
      ];

    case HistoryActionTypes.DELETE_ACTIVITY:
      newState = [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
      return newState.length ? newState : [createUnsortedActivity()];

    case HistoryActionTypes.PURGE_HISTORY:
      newState = state.filter(
        item => new Date(item.datetime).getTime() >= action.payload
      );
      return newState.length ? newState : [createUnsortedActivity()];

    case HistoryActionTypes.RESTORE_HISTORY:
      return action.payload;

    case HistoryActionTypes.DISPLAY_NOTIFICATION:
      if (Notification.permission === "granted") {
        const lastHistoryItem = state[0];

        if ("serviceWorker" in navigator) {
          var options = {
            body: "Elasped: " + action.payload,
            timestamp: new Date(lastHistoryItem.datetime).getTime(),
            icon: "android-chrome-192x192.png",
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

    default:
      return state;
  }
};

export default historyReducer;

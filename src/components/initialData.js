const initialData = {
  details: {
    "detail-1": { id: "detail-1", content: "Meal" },
    "detail-2": { id: "detail-2", content: "Prepare" },
    "detail-3": { id: "detail-3", content: "Snack" },
    "detail-4": { id: "detail-4", content: "Aerobic" },
    "detail-5": { id: "detail-5", content: "Strength" },
    "detail-6": { id: "detail-6", content: "Game" },
    "detail-7": { id: "detail-7", content: "Movie" },
    "detail-8": { id: "detail-8", content: "Music" },
    "detail-9": { id: "detail-9", content: "Read" },
    "detail-10": { id: "detail-10", content: "Surfing" },
    "detail-11": { id: "detail-11", content: "Tourism" },
    "detail-12": { id: "detail-12", content: "TV" },
    "detail-13": { id: "detail-13", content: "Beauty" },
    "detail-14": { id: "detail-14", content: "Groceries" },
    "detail-15": { id: "detail-15", content: "Health" },
    "detail-16": { id: "detail-16", content: "Housework" },
    "detail-17": { id: "detail-17", content: "Hygiene" },
    "detail-18": { id: "detail-18", content: "Get Ready" },
    "detail-19": { id: "detail-19", content: "Potty" },
    "detail-20": { id: "detail-20", content: "Shop" },
    "detail-21": { id: "detail-21", content: "Friend" },
    "detail-22": { id: "detail-22", content: "Partner" },
    "detail-23": { id: "detail-23", content: "Relative" },
    "detail-24": { id: "detail-24", content: "Coding" },
    "detail-25": { id: "detail-25", content: "Instrument" },
    "detail-26": { id: "detail-26", content: "Language" },
    "detail-27": { id: "detail-27", content: "Nap" },
    "detail-28": { id: "detail-28", content: "Night" },
    "detail-29": { id: "detail-29", content: "Drive" },
    "detail-30": { id: "detail-30", content: "Intercity" },
    "detail-31": { id: "detail-31", content: "Public" },
    "detail-32": { id: "detail-32", content: "Taxi" },
    "detail-33": { id: "detail-33", content: "Walk" },
    "detail-34": { id: "detail-34", content: "Coding" },
    "detail-35": { id: "detail-35", content: "Contact" },
    "detail-36": { id: "detail-36", content: "Discuss" },
    "detail-37": { id: "detail-37", content: "Job hunting" },
    "detail-38": { id: "detail-38", content: "Meetings" },
    "detail-39": { id: "detail-39", content: "Planning" },
    "detail-40": { id: "detail-40", content: "Research" },
    "detail-41": { id: "detail-41", content: "Testing" }
  },
  activities: {
    "activity-1": {
      id: "activity-1",
      title: "Eat",
      detailIds: ["detail-1", "detail-2", "detail-3"]
    },
    "activity-2": {
      id: "activity-2",
      title: "Exercise",
      detailIds: ["detail-4", "detail-5"]
    },
    "activity-3": {
      id: "activity-3",
      title: "Fun",
      detailIds: [
        "detail-6",
        "detail-7",
        "detail-8",
        "detail-9",
        "detail-10",
        "detail-11",
        "detail-12"
      ]
    },
    "activity-4": {
      id: "activity-4",
      title: "Life",
      detailIds: [
        "detail-13",
        "detail-14",
        "detail-15",
        "detail-16",
        "detail-17",
        "detail-18",
        "detail-19",
        "detail-20"
      ]
    },
    "activity-5": {
      id: "activity-5",
      title: "Social",
      detailIds: ["detail-21", "detail-22", "detail-23"]
    },
    "activity-6": {
      id: "activity-6",
      title: "Study",
      detailIds: ["detail-24", "detail-25", "detail-26"]
    },
    "activity-7": {
      id: "activity-7",
      title: "Sleep",
      detailIds: ["detail-27", "detail-28"]
    },
    "activity-8": {
      id: "activity-8",
      title: "Transport",
      detailIds: [
        "detail-29",
        "detail-30",
        "detail-31",
        "detail-32",
        "detail-33"
      ]
    },
    "activity-9": {
      id: "activity-9",
      title: "Work",
      detailIds: [
        "detail-34",
        "detail-35",
        "detail-36",
        "detail-37",
        "detail-38",
        "detail-39",
        "detail-40",
        "detail-41"
      ]
    }
  },
  activityOrder: [
    "activity-1",
    "activity-2",
    "activity-3",
    "activity-4",
    "activity-5",
    "activity-6",
    "activity-7",
    "activity-8",
    "activity-9"
  ]
};

export default initialData;

const initialData = {
  details: {
    "detail-1": { id: "detail-1", name: "Reading" },
    "detail-2": { id: "detail-2", name: "Meetings" },
    "detail-3": { id: "detail-3", name: "Email" },
    "detail-4": { id: "detail-4", name: "Phone Calls" },
    "detail-5": { id: "detail-5", name: "Research" },
    "detail-6": { id: "detail-6", name: "Discussion" },
    "detail-7": { id: "detail-7", name: "Travel" },
    "detail-8": { id: "detail-8", name: "Night" },
    "detail-9": { id: "detail-9", name: "Nap" },
    "detail-10": { id: "detail-10", name: "Breakfast" },
    "detail-11": { id: "detail-11", name: "Brunch" },
    "detail-12": { id: "detail-12", name: "Lunch" },
    "detail-13": { id: "detail-13", name: "Dinner" },
    "detail-14": { id: "detail-14", name: "Snack" },
    "detail-15": { id: "detail-15", name: "Sports" },
    "detail-16": { id: "detail-16", name: "Aerobic" },
    "detail-17": { id: "detail-17", name: "Strength" },
    "detail-18": { id: "detail-18", name: "Books" },
    "detail-19": { id: "detail-19", name: "Newspapers" },
    "detail-20": { id: "detail-20", name: "Magazines" },
    "detail-21": { id: "detail-21", name: "Internet" }
  },
  activities: {
    "activity-1": {
      id: "activity-1",
      name: "Work",
      detailIds: [
        "detail-1",
        "detail-2",
        "detail-3",
        "detail-4",
        "detail-5",
        "detail-6",
        "detail-7"
      ]
    },
    "activity-2": {
      id: "activity-2",
      name: "Sleep",
      detailIds: ["detail-8", "detail-9"]
    },
    "activity-3": {
      id: "activity-3",
      name: "Eat",
      detailIds: [
        "detail-10",
        "detail-11",
        "detail-12",
        "detail-13",
        "detail-14"
      ]
    },
    "activity-4": {
      id: "activity-4",
      name: "Commute",
      detailIds: []
    },
    "activity-5": {
      id: "activity-5",
      name: "Houework",
      detailIds: []
    },
    "activity-6": {
      id: "activity-6",
      name: "Exercise",
      detailIds: ["detail-15", "detail-16", "detail-17"]
    },
    "activity-7": {
      id: "activity-7",
      name: "Read",
      detailIds: ["detail-18", "detail-19", "detail-20", "detail-21"]
    },
    "activity-8": {
      id: "activity-8",
      name: "TV",
      detailIds: []
    }
  },
  activityIds: [
    "activity-1",
    "activity-2",
    "activity-3",
    "activity-4",
    "activity-5",
    "activity-6",
    "activity-7",
    "activity-8"
  ]
};

export default initialData;

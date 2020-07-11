import moment from "moment";

export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate();
  console.log(event.date);
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || "/assets/user.png",
    created: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName,
        host: true,
      },
    },
  };
};

export const ObjectToArray = (object) => {
  if (object) {
    return Object.entries(object).map((e) => ({ ...e[1], id: e[0] }));
  }
};

export const createDataTree = (dataset) => {
  let hashTable = Object.create(null);
  dataset.forEach((a) => (hashTable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataset.forEach((a) => {
    if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
    else dataTree.push(hashTable[a.id]);
  });
  return dataTree;
};
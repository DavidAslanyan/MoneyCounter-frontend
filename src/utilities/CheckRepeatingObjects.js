export const CheckRepeatingObjects = (items, newObject) => {
  let isRepeat = false;
  for (let j = 0; j < items.length; j++) {
    if (items[j].title !== newObject.title) {
      isRepeat = true;
    }
    else {
      isRepeat = false;
      break;
    }
  }
  if (isRepeat) {
    return true;
  }
  return false;
}

export default function paginate(oldList, num) {
  let newList = [];
  let innerList = [];

  oldList?.map((data) => {
    if (innerList.length === num) {
      newList.push(innerList);
      innerList = [];
      innerList.push(data);
    } else {
      innerList.push(data);
    }
  });

  if (innerList.lenght !== 0) {
    newList.push(innerList);
  }

  return newList;
}

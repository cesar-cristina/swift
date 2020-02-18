function persistence(num) {
  //code me
  let times = 0;
  let myString = num.toString();
  let myArr = myString.split("");

  if (myArr.length > 1) {
    times++;
    let final = myArr.reduce((a, b) => {
      a * b;
      return times;
    }, 0);
  } else {
    return 0;
  }

  return times
}

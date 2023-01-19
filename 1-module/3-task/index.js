function ucFirst(str) {
  let newStr;
  if (str.length > 1) {
    newStr = str[0].toUpperCase() + str.slice(1);
  } else if (str.length === 1) {
    newStr = str[0].toUpperCase()
  } else if (str === '') {
    newStr = str;
  }

  return newStr;
}

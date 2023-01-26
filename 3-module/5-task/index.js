function getMinMax(str) {
  let arr = str.split(' ');
  
  let result = {
    min: +arr[0],
    max: +arr[0],
  };
  
  arr.forEach(element => {
    
    element = Number(element);
    
    result.min = (element && element < result.min) ? element : result.min;
    result.max = (element && element > result.max) ? element : result.max;

  });
  
  return result;
}

function sumSalary(salaries) {
  let summ = 0;

  for (key in salaries) {
    // if ((typeof (salaries[key]) === 'number') && !isNaN(salaries[key]) && (salaries[key] !== Infinity) && (salaries[key] !== -Infinity)) {
    if ((typeof (salaries[key]) === 'number') && isFinite(salaries[key])) {
      summ += salaries[key];
    }
  }

  return summ;

}

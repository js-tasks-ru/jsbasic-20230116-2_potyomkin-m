function camelize(str) {

  return str.split('-').map(function (word, i) {
    return (i !== 0) ? word[0].toUpperCase() + word.slice(1) : word; 
  }).join('');

}
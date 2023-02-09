function highlight(table) {

  for (let row of table.rows) {
        
    if (row.cells[3].dataset.available === 'false') {
      row.cells[3].parentNode.classList.add('unavailable');
    } else {
      if (row.cells[3].dataset.available === undefined) {
        row.cells[3].parentNode.setAttribute('hidden', '');
      } else {
        row.cells[3].parentNode.classList.add('available');
      }
    }

    // row.cells[3].dataset.available === 'false' ? row.cells[3].parentNode.classList.add('unavailable') : row.cells[3].dataset.available === undefined ? row.cells[3].parentNode.setAttribute('hidden', '') : row.cells[3].parentNode.classList.add('available') ;

    row.cells[2].innerHTML === 'm' ? row.cells[2].parentNode.classList.add('male') : row.cells[2].parentNode.classList.add('female'); 

    +row.cells[1].innerHTML < 18 ? row.cells[1].parentNode.style.textDecoration = 'line-through' : row.cells[1].parentNode.style.textDecoration = ''; 


  }
}

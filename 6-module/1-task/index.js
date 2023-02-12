/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  
  constructor(rows) {
   
    let tbl = document.createElement('table');
   
    let inner = `
    <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr >
    </thead >
    <tbody>`;
    
    rows.forEach(row => {
      inner += `<tr>`;
      for (let key in row) {       
        inner += `<td>${row[key]}</td>`;
      }
      inner += `<td><button>X</button></td></tr>`;
      
    });

    inner += `</tbody>`;

    tbl.innerHTML = inner;
    
    this.elem = tbl;

    const buttons = tbl.querySelectorAll('button');
    
    buttons.forEach(button => {
      button.addEventListener('click', this.#onButtonClick);
    });

    
  }
  #onButtonClick = (e) => {
    e.target.closest('tr').remove();
  }

}

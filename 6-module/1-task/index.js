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

  _container = null;
  
  constructor(rows) {
   
    this._container = document.createElement('table');
   
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

    this._container.innerHTML = inner;
    
    const buttons = this._container.querySelectorAll('button');
    
    buttons.forEach(button => {
      button.addEventListener('click', this._onButtonClick);
    });

    
  }
  _onButtonClick = (e) => {
    e.target.closest('tr').remove();
  }

  get elem() {
    return this._container;
  }

}

import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {


  constructor(categories) {
    this.categories = categories;
    let ribbon;
    this._currentPosition = 0;

    ribbon = `
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
          ${categories.map(({ id, name }) => `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`).join('')}
        </nav>
        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;

    this._container = createElement(ribbon);

    const arrows = this._container.querySelectorAll('.ribbon__arrow');

    arrows.forEach(arrow => {
      arrow.addEventListener('click', this._onRibbonArrowsClick);
    });
    
    const links = this._container.querySelectorAll('.ribbon__inner .ribbon__item');
    
    links.forEach(link => {
      link.addEventListener('click', this._onRibbonItemClick);
    });


    this._ribbonInner = this._container.querySelector('.ribbon__inner');
    this._ribbonInner.addEventListener('scroll', this._onRibbonScroll);

  }

  _onRibbonArrowsClick = (e) => {
    if (e.target.closest('.ribbon__arrow').classList.contains('ribbon__arrow_left')) {
      this._ribbonInner.scrollBy(-350, 0); 
    }
    if (e.target.closest('.ribbon__arrow').classList.contains('ribbon__arrow_right')) {
      this._ribbonInner.scrollBy(350, 0);
    }
  };


  _onRibbonScroll = (e) => {

    if (e.target.scrollWidth === e.target.scrollLeft + e.target.clientWidth) {
      this._container.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      this._container.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    }

    if (e.target.scrollLeft === 0) {
      this._container.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
    } else {
      this._container.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
    }
  };


  _onRibbonItemClick = (e) => {
    e.preventDefault();

    // работает и forEach и просто проверка на наличие класса. 
    // не понятно, что лучше использовать
    
    // const links = this._container.querySelectorAll('.ribbon__inner .ribbon__item');
    // links.forEach(link => {
    //   link.classList.remove('ribbon__item_active');
    // });

    const active = document.querySelector('.ribbon__item_active');
    if (active) {
      active.classList.remove('ribbon__item_active');
    }


    e.target.closest('.ribbon__item').classList.add('ribbon__item_active');

    const categoryEvent = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
      detail: e.target.closest('.ribbon__item').dataset.id, // уникальный идентификатора категории из её объекта
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });

    this.elem.dispatchEvent(categoryEvent);
  }

  get elem() {
    return this._container;
  }
}

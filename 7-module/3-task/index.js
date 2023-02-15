import createElement from '../../assets/lib/create-element.js';


export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    let slider = `
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps">
          `;
    for (let index = 0; index < steps; index++) {      
      slider += `<span></span>`;
    }
    slider += `
        </div>
      </div>
    `;

    this._container = createElement(slider);
    
    this._moveSlider(this.value);

    this._container.addEventListener('click', this._onSliderClick);

  }

  _onSliderClick = (e) => {
    //вычисляем ширину контейнера и и текушую позицию курсора при клике
    const width = this._container.querySelector('.slider__steps').getBoundingClientRect().width;
    const position = this._container.querySelector('.slider__steps').getBoundingClientRect().left;

    //вычисляем к какому элементу ближе всего
    this.value = Math.round((e.pageX - position) / (width / (this.steps - 1)));

    //вызываем функцию передвигающую слайдер
    this._moveSlider(this.value);


    const sliderEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'ribbon-select'
      detail: this.value, // уникальный идентификатора категории из её объекта
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });

    this.elem.dispatchEvent(sliderEvent);
  }

  _moveSlider = (value) => {
    //убираем активный span у всех
    const spans = this._container.querySelectorAll('.slider__steps span');
    spans.forEach(span => {
      span.classList.remove('slider__step-active');
    });

    // Добавляем активный span
    spans[value].classList.add('slider__step-active');

    //меняем число в ползунке
    this._container.querySelector('.slider__value').innerHTML = value;

    //вычисляем на сколько нужно двинуть ползунок в % и двигаем
    let position = this.value * 100 / (this.steps - 1);
    this._container.querySelector('.slider__thumb').style.left = position + '%';

    //закрашиваем прогресс
    this._container.querySelector('.slider__progress').style.width = position + '%';
  }

  get elem() {
    return this._container;
  }

}

import createElement from '../../assets/lib/create-element.js';


export default class StepSlider {
  constructor({ steps, value = 3 }) {
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
    
    this._sliderMove(this._sliderPosition(this.value));
    
    this.elem.addEventListener('click', this._onSliderClick);


    this._thumb = this.elem.querySelector('.slider__thumb');
    this._thumb.addEventListener('dragstart', this._onDragStart);
    this._thumb.addEventListener('pointerdown', this._onDown);
  }


  _onSliderClick = (e) => {
    // вычисляем ширину контейнера и и текушую позицию курсора при клике
    const width = this.elem.querySelector('.slider__steps').getBoundingClientRect().width;
    const position = this.elem.querySelector('.slider__steps').getBoundingClientRect().left;

    //вычисляем к какому элементу ближе всего
    const tmpValue = Math.round((e.pageX - position) / (width / (this.steps - 1)));

    if (tmpValue !== this.value ) {
      this.value = tmpValue;
      
      //вызываем функцию передвигающую слайдер
      this._sliderMove(this._sliderPosition(this.value));
      this._sliderCustomEvent();
    } 
  }


  _sliderCustomEvent() {
    const sliderEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'ribbon-select'
      detail: this.value, // уникальный идентификатора категории из её объекта
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });

    this.elem.dispatchEvent(sliderEvent);
  }

  
  _sliderPosition(value) {
    return 100 * value / (this.steps - 1);
  }


  _sliderMove = (sliderPosition) => {
    this.elem.querySelector('.slider__thumb').style.left = `${sliderPosition}%`;
    this.elem.querySelector('.slider__progress').style.width = `${sliderPosition}%`;
    this._updateSlider();
  }


  _onDragStart(event) {
    event.preventDefault();
  }


  _onDown = () => {
    this.elem.classList.add('slider_dragging');
    
    //устанавлиавем значение на момент начала drag и в ~124 строке сравниваем - появились ли изменения
    this.tmpValue = this.value; 
    
    document.addEventListener('pointermove', this._onMove);

    const { width } = this._thumb.getBoundingClientRect();

    this.thumbWidth = width;

    document.addEventListener('pointerup', this._onUp, { once: true });
  }


  _onMove = ({ pageX }) => {

    const width = this._container.querySelector('.slider__steps').getBoundingClientRect().width;
    const position = this._container.querySelector('.slider__steps').getBoundingClientRect().left;

    let currentPosition = (pageX - position) * 100 / width;

    currentPosition = currentPosition < 0 ? 0 : currentPosition;
    currentPosition = currentPosition > 100 ? 100 : currentPosition;

    
    this.value = Math.round(currentPosition * (this.steps - 1) / 100);

    this._sliderMove(currentPosition.toFixed(0));
  }


  _onUp = () => {

    this._sliderMove(this._sliderPosition(this.value));

    if (this.tmpValue !== this.value) {
      this._sliderCustomEvent();
    }

    document.removeEventListener('pointermove', this._onMove);
    this.elem.classList.remove('slider_dragging');

  }

  
  _updateSlider() {
    
    this.elem.querySelector('.slider__value').innerHTML = this.value;

    //убираем активный span у всех
    const spans = this._container.querySelectorAll('.slider__steps span');
    spans.forEach(span => {
      span.classList.remove('slider__step-active');
    });

    // Добавляем активный span
    spans[this.value].classList.add('slider__step-active');

  }

  
  get elem() {
    return this._container;
  }

}

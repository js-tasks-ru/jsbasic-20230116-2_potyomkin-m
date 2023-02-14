import createElement from '../../assets/lib/create-element.js';


export default class Carousel {

  _container = null;
  _currentSlide = 0;
  _slidesLength = 0

  constructor(slides) {
    this.slides = slides;
    this._slidesLength = slides.length - 1;
    let carousel;
    
    this._currentSlide = 0;

    /* create DOM */
    carousel = `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner" >`;

    slides.forEach(slide => {
      carousel += `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
        </div>
      `;
    });

    carousel += `</div></div>`;

    this._container = createElement(carousel);
    
    this._slidesActualization(this._currentSlide, this._slidesLength);

    
    /* Arrows handler  */
    const carouselArrows = this._container.querySelectorAll('.carousel__arrow ');

    carouselArrows.forEach((carouselArrow) => {
      carouselArrow.addEventListener('click', this._onArrowClick);
    });


    /* Carousel buttons handler  */
    const buttons = this._container.querySelectorAll('.carousel__button');

    buttons.forEach(button => {
      button.addEventListener('click', this._onCarouselButtonClick);
    });


  }


  _slidesActualization = (currentSlide, slidesLength) => {

    const inner = this._container.querySelector('.carousel__inner');
    const slides = this._container.querySelectorAll('.carousel__slide');
    

    if (currentSlide <= 0) {
      currentSlide = 0;
      this._container.querySelector('.carousel__arrow_left').style.display = 'none';
    } else {
      this._container.querySelector('.carousel__arrow_left').style.display = '';
    }


    if (currentSlide >= slidesLength) {

      currentSlide = slidesLength;
      this._container.querySelector('.carousel__arrow_right').style.display = 'none';
    } else {
      this._container.querySelector('.carousel__arrow_right').style.display = '';
    }

    inner.style.transform = `translateX(${-slides[currentSlide].offsetWidth * (currentSlide)}px)`;

  }


  _onArrowClick = (e) => {

    if (e.target.closest('.carousel__arrow').classList.contains('carousel__arrow_left')) {

      --this._currentSlide;

    }
    if (e.target.closest('.carousel__arrow').classList.contains('carousel__arrow_right')) {
      ++this._currentSlide;
    }

    this._slidesActualization(this._currentSlide, this._slidesLength);
  }


  _onCarouselButtonClick = () => {
    console.log(this.slides[this._currentSlide].id);
    const productEvent = new CustomEvent("product-add", { // имя события должно быть именно "product-add"
      detail: this.slides[this._currentSlide].id, // Уникальный идентификатора товара из объекта товара
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });

    this.elem.dispatchEvent(productEvent);
  }

  get elem() {
    return this._container;
  }
}

function initCarousel() {
  const carouselArrows = document.querySelectorAll('.carousel__arrow ');

  const carousel = document.querySelector('.carousel__inner');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const slidesLength = slides.length - 1;

  let currentSlide = 0;

  function slidesActualization(currentSlide, slidesLength) {
    
    if (currentSlide <= 0) {
      currentSlide = 0;
      document.querySelector('.carousel__arrow_left').style.display = 'none';
    } else {
      document.querySelector('.carousel__arrow_left').style.display = '';      
    }


    if (currentSlide >= slidesLength) {

      currentSlide = slidesLength;
      document.querySelector('.carousel__arrow_right').style.display = 'none';
    } else {
      document.querySelector('.carousel__arrow_right').style.display = '';
    }

    carousel.style.transform = `translateX(${-slides[currentSlide].offsetWidth * (currentSlide)}px)`;

  }


  slidesActualization(currentSlide, slidesLength);

  carouselArrows.forEach((carouselArrow) => {

    carouselArrow.addEventListener('click', () => {

      if (carouselArrow.classList.contains('carousel__arrow_left')) {
        --currentSlide;
        
      }
      if (carouselArrow.classList.contains('carousel__arrow_right')) {
        ++currentSlide;
      }

      slidesActualization(currentSlide, slidesLength);

    })


  });



  
}

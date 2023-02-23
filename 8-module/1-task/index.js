import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  i = true;
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.offsetHeight === 0) {return;}


    if (this.i) {
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
      this.i = false;
    }


    //без такого финта у меня почесму то на тестах валится node.js
    //Chrome Headless 110.0.5481.100 (Windows 10) ERROR
    // An error was thrown in afterAll
    //   TypeError: Cannot read properties of null(reading 'getBoundingClientRect')
    //     at CartIcon.updatePosition(8 - module / 1 - task / index.js: 47: 43)
    //     at HTMLDocument.< anonymous > (8 - module / 1 - task / index.js: 37: 52)


    // let containerRight;
    // try {
    //   containerRight = document.querySelector('.container').getBoundingClientRect().right + 20
    // } catch (error) {
    //   containerRight = 0;
    // }
    
    const containerRight = document.querySelector('.container') ? document.querySelector('.container').getBoundingClientRect().right + 20 : 0;
    

    let leftIndent = Math.min(
      containerRight,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + 'px';

    if (window.pageYOffset > this.initialTopCoord) {
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        right: '10px',
        left: leftIndent
      });
    } else {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        right: '',
        zIndex: ''
      });
    }


    let isMobile = document.documentElement.clientWidth <= 767;

    if (document.documentElement.clientWidth <= 767) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }
}

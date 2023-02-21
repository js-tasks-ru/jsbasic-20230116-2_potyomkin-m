import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    try {

      let carousel = new Carousel(slides);
      let carouselContainer = document.body.querySelector('[data-carousel-holder]');
      carouselContainer.append(carousel.elem);

      this.ribbon = new RibbonMenu(categories);
      let ribbonContainer = document.querySelector('[data-ribbon-holder]');
      ribbonContainer.append(this.ribbon.elem);

      this.stepSlider = new StepSlider({
        steps: 5,
        value: 3,
      });
      let sliderContainer = document.querySelector('[data-slider-holder]');
      sliderContainer.append(this.stepSlider.elem);

      let cartIcon = new CartIcon();
      let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
      cartIconHolder.append(cartIcon.elem);


      this.cart = new Cart(cartIcon);

      const response = await fetch("products.json", {
        method: "GET",
      });

      this.products = await response.json();

      this.productsGrid = new ProductsGrid(this.products);
      let productsGridHolder = document.querySelector('[data-products-grid-holder]');
      productsGridHolder.innerHTML = '';
      productsGridHolder.append(this.productsGrid.elem);

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbon.value
      });

      document.body.addEventListener('product-add', this.onProductAdd);
      sliderContainer.addEventListener('slider-change', this.onSliderChange);
      ribbonContainer.addEventListener('ribbon-select', this.onRibbonSelect);
      document.querySelector('#nuts-checkbox').addEventListener('change', this.onNutCheckboxChange);
      document.querySelector('#vegeterian-checkbox').addEventListener('change', this.onVegetarianCheckboxChange);

    } catch (error) {
      console.log("Error was found");
    }
  }

  onProductAdd = (e) => {
    this.products.forEach(product => {
      if (product.id === e.detail) {
        this.cart.addProduct(product);
      }
    });
    
  }

  onSliderChange = (e) => {
    this.productsGrid.updateFilter({
      maxSpiciness: e.detail // значение остроты из события 'slider-change'
    });
  }

  onRibbonSelect = (e) => {
    this.productsGrid.updateFilter({
      category: e.detail // категория из события 'ribbon-select'
    });
  }

  onNutCheckboxChange = (e) => {
    this.productsGrid.updateFilter({
      noNuts: e.target.checked // новое значение чекбокса
    });
  }
  onVegetarianCheckboxChange = (e) => {
    this.productsGrid.updateFilter({
      vegeterianOnly: e.target.checked // новое значение чекбокса
    });
  }
}

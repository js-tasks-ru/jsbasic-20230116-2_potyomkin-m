export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) { return; }
    let isPresent = false;
    const newCartItem = { 'product': product, 'count': 1 };
    
    if (this.cartItems.length === 0) {
      this.cartItems.push(newCartItem);
    } else {

      this.cartItems.forEach(cartItem => {

        if (product.id === cartItem.product.id) {
          ++cartItem.count;
          isPresent = true;
        }
      });
      if (!isPresent) {
        this.cartItems.push(newCartItem);
      }
      
    }

    // console.clear();
    // console.log(this.cartItems);

    this.onProductUpdate(newCartItem);
  }

  updateProductCount(productId, amount) {
    
    for (let i = 0; i < this.cartItems.length; i++) {
      if (productId === this.cartItems[i].product.id) {
        this.cartItems[i].count = this.cartItems[i].count + amount;
        this.onProductUpdate(this.cartItems[i]);
      }
      if (this.cartItems[i].count === 0) {
        this.cartItems.splice(i, 1);
      }      
    }

    // console.clear();
    // console.log(this.cartItems);

  }

  isEmpty() {
    if (this.cartItems.length !== 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    let result = 0;
    this.cartItems.forEach(cartItem => {
      result = result + cartItem.count;
    });
    return result;
  }

  getTotalPrice() {
    let result = 0;
    this.cartItems.forEach(cartItem => {
      result = result + cartItem.product.price * cartItem.count;
    });
    return result;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}


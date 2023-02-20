import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    let modalContainer = `
      <div class="modal">
        <div class="modal__overlay"></div>

          <div class="modal__inner">
            <div class="modal__header">
              <!--Кнопка закрытия модального окна-->
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>

              <h3 class="modal__title">
                
              </h3>
            </div>

            <div class="modal__body">

            </div>
          </div>

        </div>
      `;
    
    this._modal = createElement(modalContainer);

    const _modalClose = this._modal.querySelector('.modal__close');

    _modalClose.addEventListener('click', this.close);


    document.addEventListener('keydown', this._keyDown);

  }

  setTitle = (modalTitle) => {
    this._modal.querySelector('.modal__title').innerHTML = modalTitle;
  }

  setBody = (modalBody) => {
    this._modal.querySelector('.modal__body').innerHTML = '';
    this._modal.querySelector('.modal__body').append(modalBody);
  }
  open() {
    document.body.append(this._modal);
    document.body.classList.add('is-modal-open');
  }

  close = () => {
    this._modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this._keyDown);
  }

  _keyDown = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

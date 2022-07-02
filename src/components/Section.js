export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  //Это если приходит массив для перебора
  renderItems(cards) {
    cards.reverse().forEach((item) => {
      this._renderer(item);
    })
  }

  //Это если приходит одна карточка
  renderItem(item) {
    this._renderer(item);

  }
}

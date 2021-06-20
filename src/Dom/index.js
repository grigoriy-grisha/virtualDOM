class Dom {
  constructor(node) {
    this.node = node;
  }

  find(selector) {
    this.node = document.querySelector(selector);
    return this;
  }

  textNode(text) {
    return document.createTextNode(text);
  }

  get element() {
    return this.node;
  }
}

export const $ = new Dom();

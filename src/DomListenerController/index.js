class DomListenerController {
  listener(event) {
    return this[event.type](event);
  }

  addListenerHandler({ node, key, currentValue, nextValue }) {
    const eventName = key.slice(2);
    node[eventName] = nextValue;

    if (!nextValue) {
      node.removeEventListener(eventName, this.listener);
      return;
    }
    if (!currentValue) node.addEventListener(eventName, this.listener);
  }
}

export const domListenerController = new DomListenerController();

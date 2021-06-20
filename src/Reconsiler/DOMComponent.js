import { createDOMNode } from "../virtualDom/createDOMVNode";
import { patcher } from "../Patcher";
export class DOMComponent {
  constructor(element) {
    this.element = element;
    this.node = null;
    this.renderedChildren = [];
  }

  mount() {
    this.node = createDOMNode(this.element);
    return this.node;
  }

  unmount() {
    this.renderedChildren.forEach((child) => child.unmount());
  }

  receive(currentElement, nextElement) {
    return patcher.patchNode(this.node, currentElement, nextElement);
  }
}

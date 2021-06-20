import { instantiateComponent } from "./index";

//TODO доработать обработку компонентов
export class CompositeComponent {
  constructor(element) {
    this.element = element;
    this.component = null;
    this.rendereElement = null;
  }

  mount() {
    const { tagName: Component, props } = this.element;
    this.rendereElement = Component(props);
    this.component = instantiateComponent(this.rendereElement);
    this.node = this.component.mount();
    return this.node;
  }

  unmount() {
    this.component.unmount();
  }

  receive(currentElement, nextElement) {
    const { tagName: Component } = nextElement;
    const nextRenderedElement = Component(nextElement.props);

    this.component.receive(this.rendereElement, nextRenderedElement);
    this.component.node = this.node;
  }
}

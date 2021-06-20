import { instantiateComponent } from "./index";

export class CompositeComponent {
  constructor(element) {
    this.element = element;
    this.component = null;
    this.rendereElement = null;
  }

  mount() {
    const { tagName: Component, props } = this.element;
    this.component = instantiateComponent(Component(props));
    return this.component.mount();
  }

  unmount() {
    this.component.unmount();
  }

  receive(currentElement, nextElement) {
    const { tagName: Component } = this.element;
    const nextProps = nextElement.props;

    this.rendereElement = Component(nextProps);

    if (this.rendereElement.tagName === this.rendereElement.tagName) {
      currentElement.receive(currentElement, this.rendereElement);
    }
  }
}

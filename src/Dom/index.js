import { instantiateComponent } from "../Reconsiler";

class Dom {
  constructor() {
    this.currentElement = null;
    this.rootComponent = null;
    this.isMount = false;
  }

  mount(treeApp, containerNode) {
    if (!this.isMount) {
      this.currentElement = treeApp;
      this.rootComponent = instantiateComponent(treeApp);
      containerNode.appendChild(this.rootComponent.mount());
      this.isMount = true;
      return;
    }

    if (this.isMount) {
      this.rootComponent.receive(this.currentElement, treeApp);
      this.currentElement = treeApp;
    }
  }
}

export const DOM = new Dom();

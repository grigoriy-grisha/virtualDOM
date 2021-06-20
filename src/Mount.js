import { instantiateComponent } from "./Reconsiler";

let asd = null;
let isMount = false;
let rootComponent = null;
export function mount(element, containerNode) {
  if (!isMount) {
    asd = element;
    rootComponent = instantiateComponent(element);

    const node = rootComponent.mount();
    containerNode.appendChild(node);
    isMount = true;
    return node;
  }

  if (isMount) {
    const node = rootComponent.receive(asd, element);
    asd = element;
    return node;
  }
}

export function update(nextVNode, containerNode) {
  const rootComponent = instantiateComponent(nextVNode);
  const node = rootComponent.receive(asd, nextVNode);
  asd = nextVNode;
  containerNode.appendChild(node);
  return node;
}

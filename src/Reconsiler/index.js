import { CompositeComponent } from "./CompositeComponent";
import { DOMComponent } from "./DOMComponent";

export function instantiateComponent(element) {
  const type = element.tagName;
  if (typeof type === "function") return new CompositeComponent(element);
  if (typeof type === "string") return new DOMComponent(element);
}

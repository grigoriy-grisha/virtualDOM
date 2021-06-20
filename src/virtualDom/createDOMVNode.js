import { patcher } from "../Patcher";

export const createDOMNode = (vNode) => {
  if (typeof vNode === "string" || typeof vNode === "number")
    return document.createTextNode(vNode);

  const { tagName, props, children } = vNode;

  const node = document.createElement(tagName);
  patcher.patchProps(node, {}, props);
  children.forEach((child) => node.appendChild(createDOMNode(child)));

  return node;
};

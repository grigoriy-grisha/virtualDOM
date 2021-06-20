import { createDOMNode } from "../virtualDom/createDOMVNode";
import { nodesIsString } from "../utils/nodesIsString";

class Patcher {
  patchNode(node, vNode, nextVNode) {
    if (nextVNode === undefined) {
      node.remove();
      return;
    }

    if (nodesIsString(vNode, nextVNode)) {
      if (vNode === nextVNode) return node;

      const nextNode = createDOMNode(nextVNode);
      node.replaceWith(nextNode);
      return nextNode;
    }

    if (vNode.tagName !== nextVNode.tagName) {
      const nextNode = createDOMNode(nextVNode);
      node.replaceWith(nextNode);
      return nextNode;
    }

    this.patchProps(node, vNode.props, nextVNode.props);
    this.patchChildren(node, vNode.children, nextVNode.children);

    return node;
  }

  patchProp(node, key, value, nextValue) {
    if (key.startsWith("on")) {
      const eventName = key.slice(2);

      node[eventName] = nextValue;

      if (!nextValue) {
        node.removeEventListener(eventName, this.listener);
        return;
      }
      if (!value) {
        node.addEventListener(eventName, this.listener);
        return;
      }
    }

    if (nextValue == null || nextValue === false) {
      node.removeAttribute(key);
      return;
    }

    node.setAttribute(key, nextValue);
  }

  patchProps(node, props, nextProps) {
    Object.keys({ ...props, ...nextProps }).forEach((key) => {
      if (props[key] === nextProps[key]) return;
      this.patchProp(node, key, props[key], nextProps[key]);
    });
  }

  patchChildren(parent, vChildren, nextVChildren) {
    parent.childNodes.forEach((childNode, i) =>
      this.patchNode(childNode, vChildren[i], nextVChildren[i])
    );

    nextVChildren
      .slice(vChildren.length)
      .forEach((vChild) => parent.appendChild(createDOMNode(vChild)));
  }

  listener(event) {
    return this[event.type](event);
  }
}

export const patcher = new Patcher();

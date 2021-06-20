export function nodesIsString(currentVNode, nextVNode) {
  return typeof currentVNode === "string" || typeof nextVNode === "number";
}

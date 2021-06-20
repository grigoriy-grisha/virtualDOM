export const createVNode = (tagName, props = {}, ...children) => {
  if (typeof tagName === "function") return tagName(props, children);
  return { tagName, props: props ? props : {}, children: children.flat() };
};

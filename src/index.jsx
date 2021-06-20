import { createVNode } from "./virtualDom/createVNode";
import { patcher } from "./Patcher";
import { $ } from "./Dom";
import { mount, update } from "./Mount";
// import { mount } from "./Mount";

/** @jsx createVNode */

let isFirst = true;
let value = "";

function useState(initialValue) {
  if (isFirst) {
    value = initialValue;
    isFirst = false;
  }

  function setState(newValue) {
    value = newValue;
    mount(createVApp(store), document.getElementById("app"));
  }

  return [value, setState];
}

const createVApp = (store) => {
  const [value, setValue] = useState("");
  const { count } = store.state;
  const decrement = () => store.setState({ count: store.state.count - 1 });
  const increment = () => store.setState({ count: store.state.count + 1 });

  return (
    <div {...{ class: "container", "data-count": String(count) }}>
      <h1>Hello, Virtual DOM</h1>
      {value === "asd" ? "a" : "asdasd"}
      <div>Count: {String(count)}</div>
      Text node without tags
      <img src="https://i.ibb.co/M6LdN5m/2.png" width="200" />
      <button onclick={decrement}>-1</button>
      <button onclick={increment}>+1</button>
      <input
        type="text"
        value={value}
        oninput={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

const store = {
  state: { count: 0 },
  onStateChanged: () => {},
  setState(nextState) {
    this.state = nextState;
    onStateChanged();
  },
};

mount(createVApp(store), document.getElementById("app"));

// function onStateChanged() {
//   app = patch(createVApp(store), app);
// }

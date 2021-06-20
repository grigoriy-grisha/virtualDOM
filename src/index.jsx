import { createVNode } from "./virtualDom/createVNode";
import { DOM } from "./Dom";

/** @jsx createVNode */

//TODO хуки нужно привязывать к компонентам, но компонеты не стабильны :(
let isFirst = true;
let value;

function useState(initialValue) {
  if (isFirst) {
    value = initialValue;
    isFirst = false;
  }

  function setState(newValue) {
    value = newValue;
    DOM.mount(<App />, document.getElementById("app"));
  }

  return [value, setState];
}

const store = {
  data: [1, 2, 3, 4, 123, 123, 123],
};

function withStore(store) {
  const newStore = new Proxy(store, {
    set: function (item, property, value, itemProxy) {
      item[property] = value;
      setTimeout(() => DOM.mount(<App />, document.getElementById("app")));
      return true;
    },
  });

  return (Component) => {
    return (props, children) => {
      return (
        <Component {...props} store={newStore}>
          {children}
        </Component>
      );
    };
  };
}

const FilterWidget = withStore(store)(({ data, store }, [children]) => {
  return (
    <div>
      <div
        onclick={() =>
          (store.data = store.data.filter((item) => item % 2 === 0))
        }
      >
        CLICK!
      </div>
      {children[0](store.data)}
    </div>
  );
});

const VisualWidget = ({ template, data }) => {
  return data.map((dataElem) => template(dataElem));
};

const App = () => {
  return (
    <div>
      <FilterWidget>
        {(newData) => (
          <VisualWidget
            template={(data) => <div class="asdasd">{data}</div>}
            data={newData}
          />
        )}
      </FilterWidget>
    </div>
  );
};

DOM.mount(<App />, document.getElementById("app"));

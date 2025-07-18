export function main({ init, update, view }) {
  let model = init;
  const root = document.getElementById("root");

  function dispatch(msg) {
    model = update(msg, model);
    renderer();
  }

  function renderer() {
    root.innerHTML = "";
    const elements = view(model, dispatch);
    root.appendChild(elements);
  }

  //initial render
  renderer();
}

function appendChildren(parent, children) {
  for (const child of children.flat(Infinity)) {
    if (child instanceof Node) {
      parent.appendChild(child);
    } else if (child != null) {
      parent.appendChild(document.createTextNode(String(child)));
    }
  }
  return parent;
}

export function Button(handler, ...children) {
  const btn = document.createElement("button");
  btn.onclick = handler;
  return appendChildren(btn, children);
}

export function A(href, ...children) {
  const a = document.createElement("a");
  a.href = href;
  return appendChildren(a, children);
}

export function P(handler, ...children) {
  const p = document.createElement("p");
  if (handler) p.onclick = handler;
  return appendChildren(p, children);
}

export function Div(...children) {
  const div = document.createElement("div");
  return appendChildren(div, children);
}

export function IMG(src, alt = "", attrs = {}) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  for (const [key, value] of Object.entries(attrs)) {
    img.setAttribute(key, value);
  }
  return img;
}

export function UL(...items) {
  const ul = document.createElement("ul");
  for (const item of items.flat()) {
    ul.appendChild(item instanceof HTMLLIElement ? item : LI(item));
  }
  return ul;
}

export function OL(...items) {
  const ol = document.createElement("ol");
  for (const item of items.flat()) {
    ol.appendChild(item instanceof HTMLLIElement ? item : LI(item));
  }
  return ol;
}

export function LI(content) {
  const li = document.createElement("li");
  li.appendChild(
    content instanceof Node ? content : document.createTextNode(content),
  );
  return li;
}

export function Input(value = "", onInput = () => {}, attrs = {}) {
  const input = document.createElement("input");
  input.value = value;
  input.oninput = onInput;

  for (const [key, val] of Object.entries(attrs)) {
    input.setAttribute(key, val);
  }

  return input;
}

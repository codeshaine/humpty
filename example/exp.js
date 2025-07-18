import { main, Div, Button, UL, LI, Input } from "./index.js";

const Msg = Object.freeze({
  Add: "Add",
  Delete: "Delete",
  UpdateInput: "UpdateInput",
});

const init = {
  todos: [],
  input: "",
  nextId: 1,
};

function update(msg, model) {
  switch (msg.type) {
    case Msg.Add:
      if (model.input.trim() === "") return model;
      return {
        ...model,
        todos: [
          ...model.todos,
          { id: model.nextId, text: model.input, completed: false }, // completed won't be used
        ],
        input: "",
        nextId: model.nextId + 1,
      };

    case Msg.Delete:
      return {
        ...model,
        todos: model.todos.filter((todo) => todo.id !== msg.id),
      };

    case Msg.UpdateInput:
      return {
        ...model,
        input: msg.value,
      };

    default:
      return model;
  }
}

function view(model, dispatch) {
  const inputBox = Input(model.input, (e) =>
    dispatch({ type: Msg.UpdateInput, value: e.target.value }),
  );

  const addBtn = Button(() => dispatch({ type: Msg.Add }), "Add");

  const list = UL(
    ...model.todos.map((todo) =>
      LI(
        Div(
          todo.text,
          Button(() => dispatch({ type: Msg.Delete, id: todo.id }), "X")
        ),
      ),
    ),
  );

  return Div(inputBox, addBtn, list);
}

main({ init, update, view });


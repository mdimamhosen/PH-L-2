# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## What is Redux?

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

## What is React Redux?

React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update state.

## What is Redux Toolkit?

Redux Toolkit is the official, recommended way to write Redux logic. It provides good defaults for store setup out of the box, and includes the most commonly used Redux addons built-in.

## What is RTK Query?

RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

## Why is Redux so popular?

Redux is popular because it provides a clean architecture for managing state in large applications. It enforces a unidirectional data flow, making the state changes predictable and easier to debug.

## Other State Management Tools

- MobX
- Zustand
- Recoil
- Context API (built-in React feature)

## Data Flow Direction

### Unidirectional Data Flow

In unidirectional data flow, data flows in a single direction. This is the core principle of Redux and Flux architecture.

### Bidirectional Data Flow

In bidirectional data flow, data can flow in both directions. This is common in two-way data binding frameworks like AngularJS.

### Problems of Unidirectional Data Flow

- Can lead to prop drilling
- May require more boilerplate code

## What is Prop Drilling?

Prop drilling is the process of passing data from a parent component to a deeply nested child component through multiple layers of intermediate components.

### Problems of Prop Drilling

- Makes the code harder to maintain
- Increases the complexity of the component tree

## What is State Lift Up?

State lift up is the process of moving state to a common ancestor component to share it between multiple child components.

### Problems of State Lift Up

- Can lead to bloated components
- Makes the state management more complex

## What is Flux Architecture?

Flux is an architecture for building client-side web applications. It complements React's composable view components by utilizing a unidirectional data flow.

### Diagram of Flux Architecture

```plaintext
+-------------+    +-------------+    +-------------+
|   Actions   | -> |   Dispatcher| -> |    Store    |
+-------------+    +-------------+    +-------------+
                                          |
                                          v
                                     +-------------+
                                     |    View     |
                                     +-------------+
```

### Folder Structure Example

```
src/
|-- actions/
|   |-- actionTypes.js
|   |-- index.js
|-- components/
|   |-- App.js
|-- reducers/
|   |-- index.js
|-- store/
|   |-- configureStore.js
|-- index.js
```

## What is State?

State is a JavaScript object that holds some information that may change over the lifetime of the component.

## What is State and Reducer?

A reducer is a function that determines changes to an application's state. It uses the action it receives to determine this change.

## What is Dispatch?

Dispatch is a function used to send actions to the Redux store.

## What is Payload and Action?

An action is a plain JavaScript object that has a type field. A payload is the information that we want to pass with the action.

### Workflow of Redux

```plaintext
+-------------+    +-------------+    +-------------+
|   Action    | -> |   Reducer   | -> |    Store    |
+-------------+    +-------------+    +-------------+
                                          |
                                          v
                                     +-------------+
                                     |    View     |
                                     +-------------+
```

- **Reducer**: How to do (Business Logic)
- **Action**: What to do
- **Store**: What to store

## What is Immer?

Immer is a library that allows you to work with immutable state in a more convenient way. It simplifies the process of updating state by using a "proxy" mechanism to record changes to a draft state, which is then used to produce the next immutable state.

### How does Immer handle state behind the scenes in Redux?

Immer works by creating a draft state that you can modify directly. Under the hood, it uses a proxy to track all the changes you make to the draft. Once you finish making changes, Immer produces a new immutable state based on the modifications. This approach allows you to write simpler and more readable code without worrying about mutating the original state.

```js
import produce from "immer";

const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return produce(state, (draft) => {
        draft.todos.push(action.payload);
      });
    default:
      return state;
  }
};
```

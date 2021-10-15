const app_reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload].sort(
          (a, b) => parseFloat(a.dueDate) - parseFloat(b.dueDate)
        ),
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "CLEAR_TODOS":
      return {
        ...state,
        todos: [],
      };

    case "OPEN_BULK":
      return {
        ...state,
        isBulkOpen: true,
      };

    case "CLOSE_BULK":
      return {
        ...state,
        isBulkOpen: false,
      };

    case "TOGGLE_EDITING":
      return {
        ...state,
        isEditingOpen: !state.isEditingOpen,
      };

    case "CLOSE_EDITING":
      return {
        ...state,
        isEditingOpen: false,
      };

    case "SEARCH_TODO":
      let temp_todos = [...state.todos];
      if (action.payload) {
        temp_todos = temp_todos.filter((todo) =>
          todo.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          filtered_todos: temp_todos,
        };
      }
      return {
        ...state,
        filtered_todos: [...state.todos],
      };

    case "UPDATE_TODO":
      const { title, desc, priority, id, dueDate } = action.payload;
      const newTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          let newTodo = { ...todo, id, title, desc, dueDate, priority };
          console.log(newTodo);
          return newTodo;
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todos: newTodos.sort(
          (a, b) => parseFloat(a.dueDate) - parseFloat(b.dueDate)
        ),
      };

    case "ADD_TO_CHECK":
      return {
        ...state,
        checked_todos: [...state.checked_todos, action.payload],
      };

    case "REMOVE_FROM_CHECK":
      if (action.payload) {
        const { id } = action.payload;
        const newCheckedTodos = state.checked_todos.filter(
          (todo) => todo.id !== id
        );
        return { ...state, checked_todos: newCheckedTodos };
      } else {
        return { ...state };
      }

    case "CLEAR_CHECKED_TODOS":
      let duplicateTodos = state.todos.concat(state.checked_todos);
      let filterList = {};
      duplicateTodos.forEach((todo) => {
        if (filterList[todo.id] == null) {
          filterList[todo.id] = 1;
        } else {
          const newCounter = filterList[todo.id] + 1;
          filterList[todo.id] = newCounter;
        }
      });

      let finalTodos = [];

      duplicateTodos.forEach((todo) => {
        if (filterList[todo.id] == 1) {
          finalTodos.push(todo);
        }
      });
      console.log(finalTodos);
      console.log(duplicateTodos);
      return {
        ...state,
        todos: finalTodos,
      };

    default:
      return state;
  }
};

export default app_reducer;

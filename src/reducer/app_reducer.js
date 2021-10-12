const app_reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, title, desc, dueDate, priority } = action.payload;
      const newTodo = { id, title, desc, dueDate, priority };

      return {
        ...state,
        todos: [...state.todos, newTodo].sort(
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

    default:
      return state;
  }
};

export default app_reducer;

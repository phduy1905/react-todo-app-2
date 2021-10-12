import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/app_reducer";

const getLocalStorage = () => {
  let todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

const initialState = {
  todos: getLocalStorage(),
  filtered_todos: [],
  isBulkOpen: false,
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = (title, desc, dueDate, priority, id) => {
    dispatch({
      type: "ADD_TODO",
      payload: { title, desc, dueDate, priority, id },
    });
  };

  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const clearTodos = () => {
    dispatch({ type: "CLEAR_TODOS" });
  };

  const openBulk = () => {
    dispatch({ type: "OPEN_BULK" });
  };

  const closeBulk = () => {
    dispatch({ type: "CLOSE_BULK" });
  };

  const searchTodo = (string) => {
    dispatch({ type: "SEARCH_TODO", payload: string });
  };

  const updateTodo = (id, title, desc, dueDate, priority) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: { id, title, desc, dueDate, priority },
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addTodo,
        removeTodo,
        clearTodos,
        openBulk,
        closeBulk,
        searchTodo,
        updateTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

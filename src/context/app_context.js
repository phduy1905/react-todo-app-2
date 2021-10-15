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
  isEditingOpen: false,
  checked_todos: [],
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodo = (newTodo) => {
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
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

  const updateTodo = (data) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: data,
    });
  };

  const toggleEditing = () => {
    dispatch({ type: "TOGGLE_EDITING" });
  };

  const closeEditing = () => {
    dispatch({ type: "CLOSE_EDITING" });
  };

  const addToCheck = (todo) => {
    dispatch({ type: "ADD_TO_CHECK", payload: todo });
  };

  const removeFromCheck = (todo) => {
    dispatch({ type: "REMOVE_FROM_CHECK", payload: todo });
  };

  const clearCheckedTodos = () => {
    dispatch({ type: "CLEAR_CHECKED_TODOS" });
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
        toggleEditing,
        closeEditing,
        addToCheck,
        removeFromCheck,
        clearCheckedTodos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

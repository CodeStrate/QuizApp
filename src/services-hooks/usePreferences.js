import { useCallback, useReducer, useMemo } from "react";

const getInitialState = () => ({
  amount: 5,
  difficulty: "easy",
  type: "multiple",
  category: "9",
});

const preferencesReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        ...action.payload,
      };
    case "reset":
      return action.payload || getInitialState();
    default:
      return state;
  }
};

const usePreferences = (initialState = getInitialState()) => {
  const [preferences, dispatch] = useReducer(preferencesReducer, initialState);

  const reset = useCallback(() => {
    dispatch({ type: "reset", payload: initialState });
  }, [initialState]);

  const update = useCallback((newPreferences) => {
    dispatch({ type: "update", payload: newPreferences });
  }, []);

  return useMemo(
    () => ({
      preferences,
      reset,
      update,
    }),
    [preferences, reset, update]
  );
};

export default usePreferences;

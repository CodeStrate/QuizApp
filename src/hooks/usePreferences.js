import { useCallback, useReducer, useMemo } from "react";

const initialPrefState = {
  amount: 5,
  difficulty: "easy",
  type: "boolean",
  category: "9",
};

const preferencesReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "reset":
      return initialPrefState;
    default:
      return state;
  }
};

const usePreferences = () => {
  const [preferences, dispatch] = useReducer(
    preferencesReducer,
    initialPrefState
  );

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const update = useCallback((name, value) => {
    dispatch({ type: "update", name, value });
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

// TODO: potential util function
const calculateScore = (data) => {
  if (!data) return 0;

  return data.reduce((acc, d) => {
    if (d.selectedOptionId === d.answer.id) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

// TODO: This can potentially shared
export const RequestStatus = {
  Idle: "idle",
  Pending: "pending",
  Rejected: "rejected",
  Resolved: "resolved",
};

export const GameStatus = {
  Idle: "idle",
  Loading: "loading",
  Over: "over",
  Playing: "playing",
};

export const getInitialState = () => ({
  requestStatus: RequestStatus.Idle,
  gameStatus: GameStatus.Idle,
  backupData: null,
  data: null,
  error: null,
  score: 0,
});

const quizDataReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        score: 0,
        requestStatus: RequestStatus.Pending,
        gameStatus: GameStatus.Loading,
        backupData: null,
        data: null,
        error: null,
      };

    case "error":
      return {
        ...state,
        score: 0,
        requestStatus: RequestStatus.Rejected,
        gameStatus: GameStatus.Idle,
        backupData: null,
        data: null,
        error: action.payload,
      };

    case "success":
      return {
        ...state,
        score: 0,
        requestStatus: RequestStatus.Resolved,
        gameStatus: GameStatus.Playing,
        data: action.payload,
        backupData: action.payload,
        error: null,
      };

    case "restart":
      return {
        ...state,
        error: null,
        data: state.backupData,
        gameStatus: GameStatus.Playing,
        score: 0,
      };

    case "select-option": {
      if (state.gameStatus !== GameStatus.Playing) return state;

      const data = state.data.map((q) => {
        if (q.questionId === action.payload.questionId) {
          return { ...q, selectedOptionId: action.payload.optionId };
        }

        return q;
      });

      return { ...state, data };
    }

    case "finish":
      if (state.gameStatus !== GameStatus.Playing) return state;

      return {
        ...state,
        gameStatus: GameStatus.Over,
        score: calculateScore(state.data),
      };

    default:
      return state;
  }
};

export default quizDataReducer;

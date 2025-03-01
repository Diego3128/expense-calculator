export type BudgetActions = {
  type: "define-budget";
  payload: { budget: number };
};

export type BudgetStateType = {
  budget: number;
};

export const budgetInitialState: BudgetStateType = {
  budget: 0,
};

export const budgetReducer = (
  state: BudgetStateType,
  action: BudgetActions
): BudgetStateType => {
  switch (action.type) {
    case "define-budget": {
      return {
        ...state,
        budget: action.payload.budget,
      };
    }

    default: {
      return state;
    }
  }
};

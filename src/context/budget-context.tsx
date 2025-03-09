import {
  JSX,
  useReducer,
  createContext,
  Dispatch,
  useEffect,
  useMemo,
} from "react";

import {
  budgetReducer,
  budgetInitialState,
  type BudgetStateType,
  type BudgetActions,
} from "../reducers/budget-reducer";

type BudgetProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type BudgetContextProps = {
  budgetState: BudgetStateType;
  budgetDispatch: Dispatch<BudgetActions>;
  budgetStats: { spentBudget: number; availableBudget: number };
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [budgetState, budgetDispatch] = useReducer(
    budgetReducer,
    budgetInitialState
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(budgetState.expenses));
    localStorage.setItem("budget", budgetState.budget.toString());
  }, [budgetState]);

  const spentBudget = useMemo(() => {
     return budgetState.categoryFilter == ""
      ? budgetState.expenses.reduce(
          (accumulator, expense) => accumulator + +expense.expenseAmount,
          0
        )
      : budgetState.filteredExpenses.reduce(
          (accumulator, expense) => accumulator + +expense.expenseAmount,
          0
        );
  }, [budgetState.expenses, budgetState.budget, budgetState.filteredExpenses]);

  const availableBudget = useMemo(
    () => budgetState.budget - spentBudget,
    [budgetState.expenses, budgetState.budget]
  );

  return (
    <BudgetContext.Provider
      value={{
        budgetState,
        budgetDispatch,
        budgetStats: { spentBudget, availableBudget },
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

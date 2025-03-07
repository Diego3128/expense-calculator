import { JSX, useReducer, createContext, Dispatch, useEffect } from "react";
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

  return (
    <BudgetContext.Provider value={{ budgetState, budgetDispatch }}>
      {children}
    </BudgetContext.Provider>
  );
}

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
import { categories } from "../data/expense-categories";
import { CategoryStat } from "../types";
import { calcExpenseTotal, calcPercentage } from "../helpers";

type BudgetProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type BudgetContextProps = {
  budgetState: BudgetStateType;
  budgetDispatch: Dispatch<BudgetActions>;
  budgetStats: {
    spentBudget: number;
    availableBudget: number;
    categoryStats: CategoryStat[];
  };
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [budgetState, budgetDispatch] = useReducer(
    budgetReducer,
    budgetInitialState
  );

  // sync changes to the localstorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(budgetState.expenses));
    localStorage.setItem("budget", budgetState.budget.toString());
  }, [budgetState]);

  // shows general budget
  const spentBudget = useMemo(() => {
    return budgetState.expenses.reduce(
      (accumulator, expense) => accumulator + +expense.expenseAmount,
      0
    );
  }, [budgetState.expenses, budgetState.budget]);

  const availableBudget = useMemo(
    () => budgetState.budget - spentBudget,
    [budgetState.expenses, budgetState.budget]
  );

  // stats for each category
  const categoryStats: CategoryStat[] = useMemo(() => {
    return categories.map((category) => {
      const categoryExpenses = budgetState.expenses.filter(
        (expense) => expense.expenseCategoryId === category.id
      );

      const total = calcExpenseTotal(categoryExpenses);
      const percentage = calcPercentage(total, budgetState.budget || 1);

      const categoryStat: CategoryStat = {
        categoryId: category.id,
        total,
        percentage,
        numExpenses: categoryExpenses.length,
      };

      return categoryStat;
    });
  }, [budgetState.expenses, categories]);

  return (
    <BudgetContext.Provider
      value={{
        budgetState,
        budgetDispatch,
        budgetStats: { spentBudget, availableBudget, categoryStats },
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

import { v4 as uuidv4 } from "uuid";

import type { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | {
      type: "define-budget";
      payload: { budget: number };
    }
  | {
      type: "show-modal";
    }
  | {
      type: "hide-modal";
    }
  | {
      type: "add-expense";
      payload: { expense: DraftExpense };
    }
  | {
      type: "remove-expense";
      payload: { expenseId: Expense["id"] };
    }
  | {
      type: "set-expense-editing-id";
      payload: { expenseId: Expense["id"] };
    }
  | {
      type: "update-expense";
      payload: { expense: Expense };
    };

export type BudgetStateType = {
  budget: number;
  openModal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
};


const getStoredBudget = (): number => {
  const budget = localStorage.getItem("budget");
  return budget ? +budget : 0;
};
const getStoredExpenses = (): Expense[] => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

export const budgetInitialState: BudgetStateType = {
  budget: getStoredBudget(),
  openModal: false,
  expenses: getStoredExpenses(),
  editingId: "",
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
    case "show-modal": {
      return {
        ...state,
        openModal: true,
      };
    }

    case "hide-modal": {
      return {
        ...state,
        openModal: false,
        editingId: "",
      };
    }

    case "add-expense": {
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { ...action.payload.expense, id: uuidv4() },
        ],
        openModal: false,
      };
    }
    case "remove-expense": {
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.expenseId
        ),
      };
    }

    case "set-expense-editing-id": {
      return {
        ...state,
        editingId: action.payload.expenseId,
        openModal: true,
      };
    }

    case "update-expense": {
      let updatedExpenses: Expense[] = [];
      updatedExpenses = state.expenses.map((expense) => {
        return expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense;
      });

      return {
        ...state,
        expenses: updatedExpenses,
        editingId: "",
        openModal: false,
      };
    }

    default: {
      return state;
    }
  }
};

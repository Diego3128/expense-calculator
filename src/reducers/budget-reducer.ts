import { v4 as uuidv4 } from "uuid";

import type { Category, DraftExpense, Expense } from "../types";

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
    }
  | {
      type: "reset-app";
    }
  | {
      type: "set-category-filter";
      payload: { categoryId: Category["id"] };
    }
  | {
      type: "update-budget";
      payload: { previousBudget: number };
    };

export type BudgetStateType = {
  budget: number;
  previousBudget: number | "";
  openModal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  categoryFilter: Category["id"];
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
  previousBudget: "",
  openModal: false,
  expenses: getStoredExpenses(),
  editingId: "",
  categoryFilter: "",
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
        previousBudget: "",
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

    case "reset-app": {
      return {
        ...state,
        budget: 0,
        expenses: [],
      };
    }

    case "set-category-filter": {
      return {
        ...state,
        categoryFilter: action.payload.categoryId,
      };
    }

    case "update-budget": {
      return {
        ...state,
        budget: 0,
        previousBudget: action.payload.previousBudget,
      };
    }

    default: {
      return state;
    }
  }
};

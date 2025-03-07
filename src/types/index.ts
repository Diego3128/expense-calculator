export type Category = {
  id: string;
  name: string;
  icon: string;
};

// react-date-picker types:
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// stored expense:
export type Expense = {
  id: string;
  expenseName: string;
  expenseAmount: number | ''; // '' allows deleting the whole input in ExpenseForm.tsx
  expenseDate: Value;
  expenseCategoryId: Category["id"];
};

export type DraftExpense = Omit<Expense, "id">;
// temporal expense:

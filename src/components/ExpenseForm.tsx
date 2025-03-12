import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";

import { categories } from "../data/expense-categories";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const {
    budgetState,
    budgetDispatch,
    budgetStats: { availableBudget },
  } = useBudget();

  const EXPENSE_DEFAULT_VALUE: DraftExpense = {
    expenseName: "",
    expenseAmount: "",
    expenseCategoryId: "0",
    expenseDate: new Date(),
  };

  const [expense, setExpense] = useState<DraftExpense>(EXPENSE_DEFAULT_VALUE);

  // editingAmount is taking into account when checking if therés enough budget to update the expense
  const [editingAmount, setEditingAmount] = useState(0);

  const [error, setError] = useState("");

  useEffect(() => {
    if (budgetState.editingId) {
      const editingExpense = budgetState.expenses.filter(
        (currentExpense) => currentExpense.id === budgetState.editingId
      )[0];
      setExpense(editingExpense);
      setEditingAmount(+editingExpense.expenseAmount);
    }
  }, [budgetState.editingId]);

  // update expense.expenseDate
  const handleChangeDate = (value: Value) => {
    setExpense((prevExpense) => {
      return { ...prevExpense, expenseDate: value };
    });
  };
  // update expense.Name|Amount|CategoryId dinamacally
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const allowedFields = ["expenseName", "expenseAmount", "expenseCategoryId"];
    if (!allowedFields.includes(name)) return;

    const isAmount = name === "expenseAmount";
    const isNan = isNaN(+value) || value === "";

    setExpense((prevExpense) => {
      return {
        ...prevExpense,
        [name]: !isAmount ? value : isAmount && !isNan ? +value : "",
      };
    });
  };
  //
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      Object.values(expense).includes("") ||
      Object.values(expense).includes(0) ||
      Object.values(expense).includes("0") ||
      Object.values(expense).includes(null)
    ) {
      setError("all fields are required.");
      return;
    }
    // check if there's enough budget before addingor editing an expense
    if (+expense.expenseAmount > availableBudget + editingAmount) {
      setError("There isn't enough money for this expense.");
      return;
    }
    // create new expense or update
    if (budgetState.editingId) {
      budgetDispatch({
        type: "update-expense",
        payload: { expense: { ...expense, id: budgetState.editingId } },
      });
    } else {
      budgetDispatch({ type: "add-expense", payload: { expense } });
    }
    setError("");
    setExpense(EXPENSE_DEFAULT_VALUE);
    setEditingAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <legend className="uppercase text-2xl text-center border-b-4 font-black py-2 border-blue-500 text-white">
        {`${budgetState.editingId ? "Edit" : "Create"} Expense`}
      </legend>

      {/* Error Message */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Expense Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseName"
          className="text-xl capitalize text-gray-300"
        >
          Name
        </label>
        <input
          onChange={handleChange}
          value={expense.expenseName}
          id="expenseName"
          placeholder="Expense name"
          className="bg-[#38384f] p-2 capitalize outline-none border-b focus:bg-gray-900 border-blue-400 text-white"
          type="text"
          name="expenseName"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseAmount"
          className="text-xl capitalize text-gray-300"
        >
          Amount
        </label>
        <input
          value={expense.expenseAmount}
          onChange={handleChange}
          id="expenseAmount"
          placeholder="e.g: 120"
          className="bg-[#38384f] p-2 capitalize outline-none border-b focus:bg-gray-900 border-blue-400 text-white"
          type="number"
          name="expenseAmount"
          step="100"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseCategoryId"
          className="text-xl capitalize text-gray-300"
        >
          Category
        </label>

        <select
          name="expenseCategoryId"
          id="expenseCategoryId"
          className="p-2.5 bg-[#38384f] capitalize outline-none border-b focus:bg-gray-900 border-blue-400 text-white"
          onChange={handleChange}
          value={expense.expenseCategoryId}
        >
          <option className="text-center capitalize" disabled value="0">
            --- Choose a category ---
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Picker */}
      <div className="flex flex-col gap-2">
        <label className="text-xl capitalize text-gray-300">Date</label>

        <DatePicker
          onChange={handleChangeDate}
          value={expense.expenseDate}
          className="bg-[#38384f] p-2 capitalize outline-none border-b focus:bg-gray-900 border-blue-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="my-6 text-white bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-3 uppercase font-bold rounded-lg"
      >
        {`${budgetState.editingId ? "Save Changes" : "Create Expense"}`}
      </button>
    </form>
  );
}

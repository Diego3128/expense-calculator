import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { useBudget } from "../hooks/useBudget";
import ErrorMessage from "./ErrorMessage";

export default function BudgetForm() {
  const {
    budgetDispatch,
    budgetState: { previousBudget, expenses },
    budgetStats: { spentBudget },
  } = useBudget();

  const [budget, setBudget] = useState<number | string>("");

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // allow an empty string
    if (typeof e.target.value === "string" && e.target.value === "")
      setBudget(e.target.value);
    // check valid number
    const value = +e.target.value;
    if (!isNaN(value) && value > 0) setBudget(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "e" || e.key === "E" ? e.preventDefault() : "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validBudget) return;

    // (edit budget) if there are expenses, the new budget should not be greated than the spentBudget
    if (expenses.length > 0 && +budget < spentBudget) {
      setError(
        "New budget must be larger than the current spent budget: $" +
          spentBudget
      );
      return;
    }

    budgetDispatch({ type: "define-budget", payload: { budget: +budget } });
  };
  // validate budget (must be numeric)
  const validBudget = useMemo(
    () => typeof budget === "number" && budget > 0,
    [budget]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-gray-800 shadow-xl rounded-xl mx-auto py-10 px-8 md:px-10 border border-gray-700 transition-all duration-300"
    >
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col space-y-6">
        <label
          htmlFor="budget"
          className="text-3xl text-indigo-400 font-bold text-center tracking-wide"
        >
          Your budget
        </label>
        <div className="relative group">
          <input
            id="budget"
            type="number"
            className="w-full border border-gray-700 py-4 px-4 bg-gray-900 rounded-lg capitalize text-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-left"
            placeholder={
              previousBudget
                ? "Current budget: $" + previousBudget.toString()
                : "Define your budget"
            }
            value={budget}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <span className="text-gray-400">$</span>
          </div>
        </div>
      </div>

      <button
        disabled={!validBudget}
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 p-4 uppercase font-black text-white w-full md:w-2/3 mx-auto block disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Set Budget
      </button>
    </form>
  );
}

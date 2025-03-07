import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useMemo,
  useState,
} from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  const { budgetDispatch } = useBudget();

  const [budget, setBudget] = useState<number | string>("");

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
      className="space-y-7 bg-white shadow-lg rounded-lg mx-auto py-8 px-8 md:px-5"
    >
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-3xl text-blue-500 font-bold text-center"
        >
          Your budget
        </label>
        <input
          id="budget"
          type="number"
          className="w-full border border-gray-200  py-2.5 px-2 bg-white rounded-lg  capitalize"
          placeholder="define your budget"
          value={budget}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button
        disabled={!validBudget}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 p-2.5 uppercase font-black text-white w-3/5 md:w-1/2 mx-auto block disabled:opacity-50 disabled:cursor-none cursor-pointer rounded-lg"
      >
        Set Budget
      </button>
    </form>
  );
}

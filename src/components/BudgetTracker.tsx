import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  const {
    budgetState,
    budgetStats: { spentBudget, availableBudget },
  } = useBudget();

  return (
    <div className="px-8 md:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 space-y-7 bg-white shadow-lg rounded-lg mx-auto ">
      <div className="flex justify-center items-center">
        <img src="/icons/grafico.jpg" alt="percentage" />
      </div>

      <div className="flex flex-col gap-8 items-center justify-around ">
        <button
          type="button"
          className="bg-pink-600 w-full p-2.5 text-xl text-white capitalize text-center font-bold rounded-lg hover:bg-pink-700  cursor-pointer"
        >
          Reset App
        </button>

        <AmountDisplay label="budget" amount={budgetState.budget} />

        <AmountDisplay label="spent" amount={spentBudget} />

        <AmountDisplay label="available" amount={availableBudget} />
      </div>
    </div>
  );
}

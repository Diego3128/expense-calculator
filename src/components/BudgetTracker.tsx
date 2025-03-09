import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";

export default function BudgetTracker() {
  const {
    budgetState: { budget, expenses, filteredExpenses },
    budgetStats: { spentBudget, availableBudget },
    budgetDispatch,
  } = useBudget();

  const percentage = useMemo(
    () => +((spentBudget / budget) * 100).toFixed(1),
    [budget, expenses, filteredExpenses]
  );

  return (
    <div className="px-8 md:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 space-y-7 bg-white shadow-lg rounded-lg mx-auto ">
      <div className="flex justify-center items-center">
        <CircularProgressbar
          value={percentage}
          text={`${percentage.toString()}%`}
          styles={buildStyles({
            pathTransitionDuration: 2,
            textSize: "20px",
            pathColor: percentage > 90 ? "#e60076" : "#2b7fff",
            textColor: percentage > 90 ? "#e60076" : "#2b7fff",
            trailColor: "#d3d8e0",
          })}
        />
        ;
      </div>

      <div className="flex flex-col gap-8 items-center justify-around ">
        <button
          onClick={() => budgetDispatch({ type: "reset-app" })}
          type="button"
          className="bg-pink-600 w-full p-2.5 text-xl text-white capitalize text-center font-bold rounded-lg hover:bg-pink-700  cursor-pointer"
        >
          Reset App
        </button>

        <AmountDisplay label="budget" amount={budget} />

        <AmountDisplay label="spent" amount={spentBudget} />

        <AmountDisplay label="available" amount={availableBudget} />
      </div>
    </div>
  );
}

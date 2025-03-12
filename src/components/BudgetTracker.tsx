import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";
import { getColor } from "../helpers";

export default function BudgetTracker() {
  const {
    budgetState: { budget, expenses },
    budgetStats: { spentBudget, availableBudget },
    budgetDispatch,
  } = useBudget();

  const percentage = useMemo(
    () => +((spentBudget / budget) * 100).toFixed(1),
    [budget, expenses]
  );



  return (
    <div className="px-2 md:pr-3 py-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0 bg-gray-800 shadow-xl rounded-xl mx-auto border border-gray-700 transition-all duration-300">
      <div className="flex justify-center items-center max-w-44 mx-auto ">
        <div className="w-full max-w-xs">
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toString()}%`}
            styles={buildStyles({
              pathTransitionDuration: 3,
              textSize: "20px",
              pathColor: getColor(),
              textColor: getColor(),
              trailColor: "#374151", // gray-700
              backgroundColor: "#1f2937", // gray-800
            })}
            className="drop-shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center justify-around">
        <div className="flex justify-between gap-4 w-full">
          <button
            onClick={() => budgetDispatch({ type: "reset-app" })}
            type="button"
            className="bg-rose-600 hover:bg-rose-700 w-full p-3 text-white capitalize text-center font-bold rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105 hover:cursor-pointer"
          >
            Reset App
          </button>
          <button
            onClick={() =>
              budgetDispatch({
                type: "update-budget",
                payload: { previousBudget: budget },
              })
            }
            className="flex justify-center gap-2 items-center rounded-lg border-2 border-indigo-500 p-3 hover:bg-indigo-600/20 hover:cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            <span className="font-bold text-indigo-400">Edit budget</span>
            <PencilIcon className="h-6 w-6 text-indigo-400" />
          </button>
        </div>

        <div className="w-full space-y-4 bg-gray-900/60 py-5 px-2 rounded-lg border border-gray-700">
          <AmountDisplay
            label="Budget"
            amount={budget}
            labelColor="text-indigo-400"
            amountColor="text-gray-200"
          />

          <div className="w-full h-px bg-gray-700"></div>

          <AmountDisplay
            label="Spent"
            amount={spentBudget}
            labelColor="text-rose-400"
            amountColor="text-gray-200"
          />

          <div className="w-full h-px bg-gray-700"></div>

          <AmountDisplay
            label="Available"
            amount={availableBudget}
            labelColor="text-emerald-400"
            amountColor="text-gray-200"
          />
        </div>
      </div>
    </div>
  );
}

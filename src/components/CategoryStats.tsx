import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useBudget } from "../hooks/useBudget";
import { categories } from "../data/expense-categories";
import { formatCurrency } from "../helpers";

export default function CategoryStats() {
  const {
    budgetStats: { categoryStats },
  } = useBudget();

  return (
    <div className="bg-white shadow-lg p-5 rounded-lg mb-5 overflow-y-auto h-96">
      <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
        Category Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categoryStats.map(({ categoryId, total, percentage, numExpenses }) => (
          <div
            key={categoryId}
            className="p-3 bg-gray-100 rounded-lg shadow flex flex-col items-center"
          >
            <p className="text-center text-gray-700 font-medium mb-2">
              {
                categories.filter((category) => category.id === categoryId)[0]
                  .name
              }
              :
              <span className="text-gray-600">{" " + numExpenses}</span>
            </p>

            {/* Circular Progress Bar */}
            <div className="w-16 h-16 mb-2">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathColor: percentage > 90 ? "#e60076" : "#2b7fff",
                  textColor: percentage > 90 ? "#e60076" : "#2b7fff",
                  trailColor: "#d3d8e0",
                  textSize: "18px",
                })}
              />
            </div>

            <p className="text-blue-500 text-lg font-semibold max-w-[100px] overflow-auto">
              {formatCurrency(total)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

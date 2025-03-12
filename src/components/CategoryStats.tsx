import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useBudget } from "../hooks/useBudget";
import { categories } from "../data/expense-categories";
import { formatCurrency, getColor } from "../helpers";

export default function CategoryStats() {
  const {
    budgetStats: { categoryStats },
  } = useBudget();

  return (
    <div className="bg-[#1e1e2e] shadow-lg p-5 rounded-lg mb-5 overflow-y-auto h-96 max-w-lg">
      <h3 className="text-xl font-semibold text-center text-white mb-4">
        Category Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {categoryStats.map(({ categoryId, total, percentage, numExpenses }) => {
          const category = categories.find((c) => c.id === categoryId);
          const color = getColor(percentage);

          return (
            <div
              key={categoryId}
              className="p-2 bg-[#2a2a3a] rounded-lg shadow flex flex-col items-center border-2"
              style={{ borderColor: color }}
            >
              <p className="text-center text-white font-medium mb-2">
                {category?.name}:
                <span className="text-blue-300">{" " + numExpenses}</span>
              </p>

              {/* Circular Progress Bar */}
              <div className="w-16 h-16 mb-2">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    pathColor: color,
                    textColor: color,
                    trailColor: "#3a3a4a",
                    textSize: "20px",
                  })}
                />
              </div>

              <p
                className="text-lg font-semibold max-w-[100px] overflow-auto"
                style={{ color }}
              >
                {formatCurrency(total)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

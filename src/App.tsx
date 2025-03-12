import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";
import CategoryStats from "./components/CategoryStats";

export default function App() {
  const { budgetState } = useBudget();

  const isBudgetSet = useMemo(() => budgetState.budget, [budgetState.budget]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-indigo-600 py-5 px-4 shadow-lg">
        <h1 className="uppercase text-center font-black text-2xl md:text-3xl text-white tracking-wider">
          expense calculator
        </h1>
      </header>

      <div className="max-w-lg lg:max-w-6xl mx-auto w-full mt-8 px-4 flex-grow">
        {!isBudgetSet ? (
          <div className="transition-all duration-500 ease-in-out">
            <BudgetForm />
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row transition-all duration-500 ease-in-out">
            <BudgetTracker />
            <CategoryStats />
          </div>
        )}
      </div>

      <main className="max-w-4xl mx-auto w-full p-4 md:p-8 mb-20 flex-grow">
        {isBudgetSet ? (
          <div className="space-y-6 transition-all duration-500 ease-in-out">
            <div className="bg-gray-800 rounded-xl shadow-xl p-4">
              <FilterByCategory />
              <ExpenseList />
            </div>
            <ExpenseModal />
          </div>
        ) : null}
      </main>

      <footer className="bg-gray-800 py-4 text-center text-sm text-gray-400">
        <p>Budget & Expense Tracker • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

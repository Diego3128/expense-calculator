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
    <>
      <header className="bg-blue-500 p-3 md:p-5">
        <h1 className="uppercase text-center font-black text-2xl md:text-3xl text-white">
          expense calculator
        </h1>
      </header>

      <div className="max-w-lg  lg:max-w-6xl mx-auto  mt-12 px-3">
        {!isBudgetSet ? (
          <BudgetForm />
        ) : (
          <div className="flex flex-col gap-4 lg:flex-row">
            <BudgetTracker />
            <CategoryStats />
          </div>
        )}
      </div>

      <main className="max-w-3xl mx-auto p-10 mb-20">
        {isBudgetSet ? (
          <>
          <div>
            <FilterByCategory />
            <ExpenseList />
          </div>
            <ExpenseModal />
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
}

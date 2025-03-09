import { useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

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

      <div className="max-w-lg md:max-w-2xl mx-auto  mt-12 px-3">
        {!isBudgetSet ? <BudgetForm /> : <BudgetTracker />}
      </div>

      <main className="max-w-3xl mx-auto p-10 mb-20">
        {isBudgetSet ? (
          <>
            <FilterByCategory />
            <ExpenseModal />
            <ExpenseList />
          </>
        ) : (
          ""
        )}
      </main>
    </>
  );
}

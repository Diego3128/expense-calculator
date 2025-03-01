import BudgetForm from "./components/BudgetForm";

export default function App() {

  return (
    <>
      <header className="bg-blue-500 p-7">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          expense calculator
        </h1>
      </header>

      <div className="max-w-2xl mx-auto  mt-12 px-3">
        <BudgetForm/>
      </div>
    </>
  );
}

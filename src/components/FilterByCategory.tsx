import { ChangeEvent } from "react";
import { categories } from "../data/expense-categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  const {
    budgetState: { categoryFilter },
    budgetDispatch,
  } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      budgetDispatch({
        type: "set-category-filter",
        payload: { categoryId: "" },
      });
    }
    if (categories.some((category) => category.id === e.target.value)) {
      budgetDispatch({
        type: "set-category-filter",
        payload: { categoryId: e.target.value },
      });
    }
  };

  return (
    <form className="text-white capitalize text-center p-4 bg-[#2a2a3a] shadow-lg rounded-lg mx-auto text-xl flex justify-center min-[500px]:justify-between gap-5 items-center flex-wrap">
      <label htmlFor="expenseCategoryId" className="font-semibold">
        Filter Expenses
      </label>
      <select
        name="expenseCategoryId"
        id="expenseCategoryId"
        className="p-2.5 bg-[#1e1e2e] text-white capitalize outline-none border-b focus:bg-[#3b3b4f] border-blue-400 w-full min-[390px]:w-auto rounded-md"
        value={categoryFilter}
        onChange={handleChange}
      >
        <option className="text-center capitalize bg-[#2a2a3a]" value="">
          All Categories
        </option>
        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
            className="bg-[#2a2a3a] text-white"
          >
            {category.name}
          </option>
        ))}
      </select>
    </form>
  );
}

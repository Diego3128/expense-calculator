import { ChangeEvent } from "react";
import { categories } from "../data/expense-categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  const {
    budgetState: { categoryFilter },
    budgetDispatch,
  } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value === ""){
      budgetDispatch({
        type: "set-category-filter",
        payload: { categoryId: ""},
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
    <form className="text-gray-700 capitalize text-center p-3.5 bg-white shadow-lg rounded-lg mx-auto py-8 px-5 text-xl flex justify-center min-[500px]:justify-between gap-5 items-center flex-wrap ">
      <label htmlFor="expenseCategoryId">Filter expenses</label>
      <select
        name="expenseCategoryId"
        id="expenseCategoryId"
        className="p-2.5 bg-slate-100 capitalize outline-none border-b focus:bg-blue-100 border-blue-400 w-full min-[390px]:w-auto"
        value={categoryFilter}
        onChange={handleChange}
      >
        <option className="text-center capitalize" value="">
          all categories
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </form>
  );
}

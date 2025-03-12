// react-swipeable-list
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
// icons
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
// local
import { useMemo } from "react";
import { categories } from "../data/expense-categories";
import { formatDate } from "../helpers";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(
    () =>
      categories.find((category) => category.id === expense.expenseCategoryId),
    [expense]
  );

  const { budgetDispatch } = useBudget();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          budgetDispatch({
            type: "set-expense-editing-id",
            payload: { expenseId: expense.id },
          })
        }
      >
        <PencilSquareIcon className="size-8 md:size-11 text-gray-200" />
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          budgetDispatch({
            type: "remove-expense",
            payload: { expenseId: expense.id },
          })
        }
      >
        <TrashIcon className="size-8 md:size-11 text-gray-200" />
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        maxSwipe={0.6}
      >
        <div className="bg-[#2a2a3a] hover:bg-[#38384f] transition-all shadow-lg w-full p-5 md:p-10 border-b border-gray-600 mb-1.5 flex justify-between items-center gap-5 min-[500px]:gap-10 flex-wrap min-[500px]:flex-nowrap select-none hover:cursor-grab active:cursor-grabbing rounded-lg">
          <div>
            <img
              className="w-16"
              src={`icons/icon_${categoryInfo?.icon || "default"}.svg`}
              alt={`icon ${categoryInfo?.name}`}
              draggable={false}
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-bold uppercase text-gray-300">
              {expense.expenseName}
            </p>
            <p className="text-sm font-bold capitalize text-gray-400">
              {categoryInfo?.name || "No Category"}
            </p>
            <p className="text-gray-500">
              {formatDate(expense.expenseDate!.toString())}
            </p>
          </div>

          <div className="text-right">
            <AmountDisplay amount={+expense.expenseAmount} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

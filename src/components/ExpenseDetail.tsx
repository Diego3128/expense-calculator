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
        <PencilSquareIcon className="size-15"/>
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
        <TrashIcon className="size-15"/>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList >
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        maxSwipe={0.51}
      >
        <div className="bg-white shadow-lg w-full p-7 md:p-10 border-b border-gray-200 mb-2.5 flex justify-between items-center   gap-5 min-[500px]:gap-10 flex-wrap min-[500px]:flex-nowrap select-none hover:cursor-grab active:cursor-grabbing">
          <div>
            <img
              className="w-16"
              src={`icons/icon_${categoryInfo?.icon || "default"}.svg`}
              alt={`icon ${categoryInfo?.name}`}
              draggable={false}
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-bold uppercase text-slate-500">
              {expense.expenseName}
            </p>
            <p className="text-sm font-bold capitalize text-slate-400">
              {categoryInfo?.name || "no category"}
            </p>
            <p>{formatDate(expense.expenseDate!.toString())}</p>
          </div>

          <div className="text-right">
            <AmountDisplay amount={+expense.expenseAmount} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

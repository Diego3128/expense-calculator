import { Fragment } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { useBudget } from "../hooks/useBudget";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseModal() {
  const { budgetState, budgetDispatch } = useBudget();

  return (
    <>
      <div className="fixed right-5 bottom-5 flex items-center justify-center z-20">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => budgetDispatch({ type: "show-modal" })}
        >
          <PlusCircleIcon className="size-15 text-white rounded-full bg-blue-600 shadow-lg" />
        </button>
      </div>

      <Transition appear show={budgetState.openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            budgetDispatch({ type: "hide-modal" });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-15"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-15" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                  <ExpenseForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

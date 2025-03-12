import { Fragment } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { useBudget } from "../hooks/useBudget";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseModal() {
  const {
    budgetState: { openModal },
    budgetDispatch,
  } = useBudget();

  return (
    <>
      {/* Floating Button */}
      <div className="fixed right-5 bottom-5 flex items-center justify-center z-20">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => budgetDispatch({ type: "show-modal" })}
        >
          {!openModal ? (
            <PlusCircleIcon className="size-15 text-gray-900 rounded-full bg-indigo-600 shadow-lg hover:bg-blue-500 transition" />
          ) : null}
        </button>
      </div>

      {/* Modal */}
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => budgetDispatch({ type: "hide-modal" })}
        >
          {/* Background Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            leave="ease-in duration-200"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* Modal Content */}
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#2a2a3a] p-6 text-left align-middle shadow-xl transition-all">
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

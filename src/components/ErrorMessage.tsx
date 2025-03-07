import { PropsWithChildren } from "react";

export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <p className="py-2 px-4 capitalize bg-red-500 text-white font-bold text-center w-max mx-auto rounded-lg">
        {children}
    </p>
  )
}

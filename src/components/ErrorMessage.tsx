import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center">
      <p className="py-3 px-5 text-white font-bold text-center mx-auto rounded-lg shadow-md border-4 border-red-700/50 animate-pulse">
        {children}
      </p>
    </div>
  );
}

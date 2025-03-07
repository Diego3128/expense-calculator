import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
      <p className=" w-full text-xl md:text-2xl text-blue-600 font-bold flex justify-between">
        {label && <span className="capitalize">{label}</span>}
        <span className="text-gray-800 md:text-xl">{formatCurrency(amount)}</span>
      </p>
  );
}

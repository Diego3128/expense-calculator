import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
  labelColor?: string;
  amountColor?: string;
};

export default function AmountDisplay({
  label,
  amount,
  labelColor = "text-indigo-400",
  amountColor = "text-gray-200",
}: AmountDisplayProps) {
  return (
    <div className="w-full text-lg flex justify-between items-center gap-1.5 flex-wrap ">
      <p className="font-bold">
        {label && <span className={`capitalize ${labelColor}`}>{label}</span>}
      </p>
      <p className={`${amountColor} font-mono`}>{formatCurrency(amount)}</p>
    </div>
  );
}

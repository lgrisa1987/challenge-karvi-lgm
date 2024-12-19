import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clearSingleParam, toggleQueryParamInUrl } from "@/lib/utils";

const selectItems = [
  { option: "Más relevantes", value: "more-relevants" },
  { option: "Menor precio", value: "low" },
  { option: "Mayor precio", value: "high" },
];

type OrderResultsProps = {
  disabled: boolean;
};

const OrderResults = ({ disabled }: OrderResultsProps) => {
  return (
    <div className="ml-auto mr-4 md:ml-0 md:mr-0">
      <Select
        disabled={disabled}
        onValueChange={(value) =>
          value === "more-relevants"
            ? clearSingleParam(location.href, "price")
            : toggleQueryParamInUrl("price", value)
        }
      >
        <SelectTrigger className="w-[9.375rem] focus:ring-Blue-Blue-800">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map(({ option, value }, i) => (
            <SelectItem
              value={value}
              className="focus:bg-Blue-Blue-800 [&>span]:focus:text-white [&_svg]:focus:stroke-white"
              key={i}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderResults;

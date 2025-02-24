import { FC } from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

interface IFieldTypeSelector {
  type: "string"; // | "number" | "array" для расширения
  onChange: (type: "string") => void; // | "number" | "array" для расширения
}

const typeOptions = [
  { value: "string", title: "Текст", disabled: false },
  { value: "number", title: "Число", disabled: true },
  { value: "array", title: "Список", disabled: true },
] as const;

export const FieldTypeSelector: FC<IFieldTypeSelector> = ({ type, onChange }) => {
  return (
    <Select.Root value={type} onValueChange={(value) => onChange(value as "string")}>
      <Select.Trigger className="inline-flex items-center justify-between w-full p-2 border rounded bg-[#0f141e]">
        <Select.Value />
        <ChevronDown className="w-4 h-4 ml-2" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-[#0f141e] border shadow-md rounded-md w-[150px]">
          <Select.Viewport className="p-1">
            {typeOptions.map(({ value, title, disabled }) => (
              <Select.Item
                key={value}
                value={value}
                disabled={disabled}
                className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer text-white ${
                  disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
              >
                <Select.ItemText>{title}</Select.ItemText>
                {type === value && <Check className="w-4 h-4 text-blue-500" />}
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

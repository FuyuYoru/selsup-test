import { FC } from "react";

interface IFieldValue {
  type: "string";
  value: string;
  onChange: (value: string) => void;
}

export const FieldValue: FC<IFieldValue> = ({ type, value, onChange }) => {
  return (
    <div>
      {type === "string" && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded p-2 w-full bg-[#0f141e] text-white"
        />
      )}
    </div>
  );
};

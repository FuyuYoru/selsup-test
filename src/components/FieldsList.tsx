import { Plus, Pencil, Trash2 } from "lucide-react";
import { FC, useCallback, useState } from "react";
import { useModel } from "../providers/ModelsProvider/provider";
import { useFieldStore } from "../store";

export const FieldsList: FC = () => {
  const { state, createField } = useModel();
  const openEditor = useFieldStore((state) => state.openEditor);

  const addNewField = useCallback(() => {
    const newField = createField();
    openEditor(newField);
  }, [])

  return (
    <div className="flex flex-col px-2 w-full items-center gap-2 overflow-y-auto">
      <div className="flex flex-row gap-2 py-3 px-4 cursor-pointer w-full sticky top-0 z-1000 bg-[#030712]" onClick={() => addNewField()}>
        <p>Добавить новое поле</p>
        <Plus />
      </div>
      {
        state.params?.map(param => {
          let paramValue;
          if (param.type === "string") {
            paramValue = state.model?.paramValues
              .find(item => item.paramId === param.id)?.value ?? " ";
          } else {
            paramValue = " "
          }
          const fieldItem = {
            ...param,
            value: paramValue
          }
          return (<FieldsItem key={param.id + param.name} itemData={fieldItem} />)
        })
      }
    </div>
  )
}

interface FieldItemProps {
  itemData: {
    id: number;
    name: string;
    type: string;
    value: string | number | unknown[];
  };
}

const FieldsItem: FC<FieldItemProps> = ({ itemData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const openEditor = useFieldStore((state) => state.openEditor);
  const { removeField } = useModel();
  return (
    <div
      key={itemData.id}
      className="grid grid-cols-3 bg-[#0f141e] rounded w-full py-3 px-4 justify-between transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="break-words overflow-hidden">{itemData.name}:</p>
      <p className="break-words overflow-hidden">{itemData.type === "string" ? String(itemData.value) : "—"}</p>
      <div
        className={`flex flex-row gap-2 justify-end transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <Pencil className="cursor-pointer text-gray-400 hover:text-white" onClick={() => openEditor(itemData)} />
        <Trash2 className="cursor-pointer text-gray-400 hover:text-red-500" onClick={() => removeField(itemData.id)} />
      </div>
    </div>
  );
  
};

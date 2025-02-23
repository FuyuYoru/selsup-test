import { FC, useState } from "react"
import { ModelProvider, useModel } from "./providers/ModelsProvider/provider";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useFieldStore } from "./store";


// interface Param {
//   id: number;
//   name: string;
//   type: "string";
// }
// interface ParamValue {
//   paramId: number;
//   value: string;
// }
// interface Model {
//   paramValues: ParamValue[];
//   colors: Color[];
// }
// interface Props {
//   params: Param[];
//   model: Model;
// }

const App: FC = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-screen h-dvh flex justify-center items-center bg-[#1c2029] text-white'>
        <ModelProvider modelId={1}>
          <FormEditor />
        </ModelProvider>
      </div>
    </>
  )
}


const FormEditor: FC = () => {

  const { isEditing } = useFieldStore();

  return (
    <>
      <div className="flex flex-col w-[70%] h-[70%] border-1 rounded-[15px] bg-[#030712] py-4 px-2 items-center gap-2 overflow-hidden">
        <h1>Model</h1>
        <div className="flex flex-row justify-between h-full w-full overflow-hidden">
          {isEditing ? <FieldEditor /> : <p>Выберите поле для редактирования</p>}
          <div
            className="h-full min-h-[1em]  w-[2px] self-stretch bg-gradient-to-tr from-transparent via-[#292f3a] to-transparent opacity-20 dark:opacity-100"
          ></div>
          <FieldsList />
        </div>

      </div>
    </>
  )
}


const FieldsList: FC = () => {
  const { state } = useModel();
  const { openEditor } = useFieldStore();

  return (
    <div className="flex flex-col px-2 w-full items-center gap-2 overflow-y-auto">
      <div className="flex flex-row gap-2 py-3 px-4 cursor-pointer w-full sticky top-0 z-1000 bg-[#030712]" onClick={() => openEditor(null)}>
        <p>Добавить новое поле</p>
        <Plus />
      </div>
      {
        state.params?.map(param => {
          const paramValues = state.model?.paramValues
            .filter(item => item.paramId === param.id)
            .map(item => item.value) || [];
          const fieldItem = {
            ...param,
            values: paramValues
          }
          console.log(fieldItem);
          return (<FieldsItem itemData={fieldItem} />)
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
    values: string[];
  };
}

interface FieldItemProps {
  itemData: {
    id: number;
    name: string;
    type: string;
    values: string[];
  };
}

const FieldsItem: FC<FieldItemProps> = ({ itemData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { openEditor } = useFieldStore();

  return (
    <div
      key={itemData.id}
      className="grid grid-cols-3 bg-[#0f141e] rounded w-full py-3 px-4 justify-between transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p>{itemData.name}:</p>
      <p >{itemData.values.length > 0 ? itemData.values.join(", ") : "—"}</p>
      <div
        className={`flex flex-row gap-2 justify-end transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <Pencil className="cursor-pointer text-gray-400 hover:text-white" onClick={() => openEditor(itemData)} />
        <Trash2 className="cursor-pointer text-gray-400 hover:text-red-500" />
      </div>
    </div>
  );
};


const FieldEditor: FC = () => {
  const { editingField, closeEditor } = useFieldStore();

  console.log(editingField);

  return (
    <div className="flex flex-col justify-between px-2 w-full h-full items-center">
      <div className="flex flex-col w-full py-4">
        <p className="text-start">Редактор полей</p>
        <p className="text-center">
          {editingField ? `Редактирование: ${editingField.name}` : "Создание нового поля"}
        </p>
      </div>
      <div className="w-full sticky bottom-0 z-1000 bg-[#030712] flex flex-row justify-between py-4 px-4 gap-2">
        <button className="w-full bg-[#0f141e] rounded py-2" onClick={closeEditor}>
          Отменить
        </button>
        <button className="w-full bg-[#0f141e] rounded py-2">Сохранить</button>
      </div>
    </div>
  );
};

export default App

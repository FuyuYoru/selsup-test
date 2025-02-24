import { FC } from "react"
import { ModelProvider, useModel } from "./providers/ModelsProvider/provider";
import { useFieldStore } from "./store";
import { FieldEditor } from "./components/ModelEditor";
import { useShallow } from "zustand/shallow";
import { FieldsList } from "./components/FieldsList";



const App: FC = () => {
  const isEditing = useFieldStore(useShallow((state) => state.isEditing));

  return (
    <>
      <div className='w-screen h-dvh flex justify-center items-center bg-[#1c2029] text-white'>
        <ModelProvider modelId={1}>
          <div className="flex flex-col w-[70%] h-[70%] border-1 rounded-[15px] bg-[#030712] py-4 px-2 items-center gap-2 overflow-hidden">
            <h1>Model</h1>
            <div className="flex flex-row justify-between h-full w-full overflow-hidden">
              {isEditing ? <FieldEditor /> : <p className="w-full py-4 px-2">Выберите поле для редактирования</p>}
              <div
                className="h-full min-h-[1em]  w-[2px] self-stretch bg-gradient-to-tr from-transparent via-[#292f3a] to-transparent opacity-20 dark:opacity-100"
              ></div>
              <FieldsList />
            </div>

          </div>
        </ModelProvider>
      </div>
    </>
  )
}

export default App

import { FC, useCallback } from "react";
import { getDefaultValueByType, useFieldStore } from "../../store";
import { FieldTypeSelector } from "./FiledTypeSelector";
import { FieldValue } from "./FieldValue";
import { useModel } from "../../providers/ModelsProvider/provider";

export const FieldEditor: FC = () => {
    const { editingField, initField, closeEditor, editField } = useFieldStore();
    const { updateFieldParams, updateFieldValue } = useModel();

    const handleChangeType = useCallback((value: "string") => {
        editField({
            type: value,
            value: getDefaultValueByType(value),
        })
    }, [editField])

    const handleChangeValue = useCallback((value: string) => {
        editField({
            value: value,
        })
    }, [editField])

    const handleChangeName = useCallback((value: string) => {
        editField({
            name: value,
        })
    }, [editField])

    const handleSave = () => {
        if (!editingField) return;

        const { id, name, type, value } = editingField;

        updateFieldParams(id, name, type);
        updateFieldValue(id, value);

        closeEditor();
    };

    if (!editingField) return null

    return (
        <div className="flex flex-col justify-between px-2 w-full h-full items-center">
            <div className="flex flex-col w-full py-4">
                <p className="text-start">Редактор полей</p>
                <p className="text-center">
                    {initField ? `Редактирование: ${initField.name}` : "Создание нового поля"}
                </p>
                <input
                    type="text"
                    value={editingField?.name}
                    onChange={(e) => handleChangeName(e.target.value)}
                    className="border rounded p-2 w-full bg-[#0f141e] text-white"
                />
                <FieldTypeSelector type={editingField?.type} onChange={(value) => handleChangeType(value)} />
                <FieldValue type={editingField?.type} value={editingField?.value} onChange={(value) => handleChangeValue(value)} />
            </div>
            <div className="w-full sticky bottom-0 z-1000 bg-[#030712] flex flex-row justify-between py-4 px-4 gap-2">
                <button className="w-full bg-[#0f141e] rounded py-2" onClick={closeEditor}>
                    Отменить
                </button>
                <button className="w-full bg-[#0f141e] rounded py-2" onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};
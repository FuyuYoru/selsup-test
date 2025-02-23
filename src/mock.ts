import { Model, Param } from "./types"

const models = [
    {
        "modelId": 1,
        "colors": null,
        "paramValues": [
            {
                "paramId": 1,
                "value": "повседневное"
            },
            {
                "paramId": 2,
                "value": "макси"
            }
        ]
    },
]

const params = [
    {
        "id": 1,
        "name": "Назначение",
        "type": "string"
    },
    {
        "id": 2,
        "name": "Длина",
        "type": "string"
    },
    
] as Param[]

export const getModelByID = async (modelId: number) => {
    return new Promise<{model: Model, params: Param[]}>((resolve, reject) => {
        setTimeout(() => {
            const model = models.find(model => model.modelId === modelId);
            if (!model) {
                reject("УПс данные не нашлись((9");
                return;
            }
            resolve({
                model, params 
            },)
        }, 1500)
    })
}
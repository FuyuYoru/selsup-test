import { FC, createContext, useContext, useEffect, ReactNode, useReducer } from "react";
import { ModelReducer } from "./reducer";
import { ModelState } from "./model";
import { getModelByID } from "../../mock";

interface IModelContext {
    state: ModelState;
    updateFieldParams: (id: number, name: string, type: "string") => void;
    updateFieldValue: (id: number, value: string) => void;
    // addField: (name: string, type: "string", value: string) => void;
    // removeField: (id: number) => void;
}

const initialState = {
    isFetched: false,
    isLoading: false,
    model: null,
    params: null,
    error: null,
}

const ModelContext = createContext<IModelContext | null>(null);

export const ModelProvider: FC<{ modelId: number, children: ReactNode }> = ({ modelId, children }) => {
    const [model, dispatch] = useReducer(ModelReducer, initialState);

    useEffect(() => {
        const fetchModel = async () => {
            dispatch({ type: "START_LOADING" });
            try {
                const data = await getModelByID(modelId);
                dispatch({
                    type: "SET_DATA",
                    payload: {
                        model: data.model,
                        params: data.params
                    }
                })
            } catch {
                dispatch({ type: "FETCH_ERROR", payload: { errorMessage: 'Ошибка при загрузке данных' } });
            } finally {
                dispatch({ type: "END_LOADING" });
            }
        };
        fetchModel();
    }, [modelId]);

    const updateFieldParams = (id: number, name: string, type: "string" = "string") => {
        dispatch({
            type: "UPDATE_FIELD_PARAMS",
            payload: {
                id, name, type
            }
        })
    }

    const updateFieldValue = (id: number, value: string) => {
        dispatch({
            type: "UPDATE_FIELD_VALUE",
            payload: {
                id, value
            }
        })
    }

    return (
        <ModelContext.Provider value={{
            state: model,
            updateFieldParams,
            updateFieldValue
        }}>
            {children}
        </ModelContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModel = () => {
    const context = useContext(ModelContext);

    if (!context) throw new Error("useForm must be used within a FormProvider");

    return context;
}
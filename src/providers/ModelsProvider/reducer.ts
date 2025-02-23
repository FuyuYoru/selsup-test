import { ModelState, ModelActions } from "./model";

export const ModelReducer = (state: ModelState, action: ModelActions): ModelState => {
    switch (action.type) {
        case "START_LOADING":
            return { ...state, isLoading: true };

        case "END_LOADING":
            return { ...state, isLoading: false };

        case "FETCH_ERROR":
            return {...state, error: action.payload.errorMessage}

        case "SET_DATA":
            return {
                ...state,
                isFetched: true,
                model: action.payload.model,
                params: action.payload.params,
            };

        case "UPDATE_FIELD_VALUE":
            if (!state.model) return state;

            return {
                ...state,
                model: {
                    ...state.model,
                    paramValues: state.model.paramValues.map((param) =>
                        param.paramId === action.payload.id ? { ...param, value: action.payload.value } : param
                    ),
                },
            };

        case "UPDATE_FIELD_PARAMS":
            if (!state.params) return state;

            return {
                ...state,
                params: state.params.map((param) =>
                    param.id === action.payload.id
                        ? { ...param, type: action.payload.type, name: action.payload.name }
                        : param
                ),
            };

        default:
            return state;
    }
};

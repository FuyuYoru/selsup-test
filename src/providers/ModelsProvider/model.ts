import { Model, Param } from "../../types";

export interface ModelState {
    isFetched: boolean;
    isLoading: boolean;
    model: Model | null;
    params: Param[] | null;
    error: null | string;
}

export type ModelActions =
    | { type: "START_LOADING" }
    | { type: "END_LOADING" }
    | { type: "FETCH_ERROR"; payload: { errorMessage: string } }
    | { type: "SET_DATA"; payload: { model: Model, params: Param[] } }
    | { type: "UPDATE_FIELD_VALUE"; payload: { id: number, value: string } }
    | { type: "UPDATE_FIELD_PARAMS"; payload: { id: number, name: string, type: "string" } };
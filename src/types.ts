export interface Param {
    id: number;
    name: string;
    type: "string";
}
export interface ParamValue {
    paramId: number;
    value: string;
}
export interface Model {
    modelId: number,
    paramValues: ParamValue[];
    colors: unknown;
}
export interface Props {
    params: Param[];
    model: Model;
}
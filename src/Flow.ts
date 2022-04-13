type FlowInput = {};
type FlowOutput = {};
type FlowId = string;

interface Flow<Input extends FlowInput = FlowInput, Output extends FlowOutput = FlowOutput> {
    (input: Input): Promise<Output> | Output,
    id?: FlowId,
}

export { FlowInput, FlowOutput, FlowId };
export default Flow;

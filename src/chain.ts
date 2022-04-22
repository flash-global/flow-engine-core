import Flow, { FlowInput, FlowOutput } from './Flow';

interface ChainFlow<
    Input extends FlowInput = FlowInput,
    Output extends FlowOutput = FlowOutput,
> extends Flow<Input, Output> {
    add: <NewOutput extends FlowOutput = FlowOutput>(flow: Flow<Output, NewOutput>) => ChainFlow<Input, NewOutput>,
}

const build = <
    Input extends FlowInput = FlowInput,
    IntermediaryType extends FlowOutput = FlowOutput,
    Output extends FlowOutput = FlowOutput,
>(lastFlow: Flow<Input, IntermediaryType>, currentFlow: Flow<IntermediaryType, Output>): ChainFlow<Input, Output> => {
    const chainFlow: ChainFlow<Input, Output> = async (input: Input): Promise<Output> => currentFlow(await lastFlow(input));

    chainFlow.add = <
        NewOutput extends FlowOutput = FlowOutput,
    >(flow: Flow<Output, NewOutput>): ChainFlow<Input, NewOutput> => build<Input, Output, NewOutput>(chainFlow, flow);

    chainFlow.id = 'chain';
    return chainFlow;
};

const chain = <
    Input extends FlowInput = FlowInput,
    Output extends FlowOutput = FlowOutput,
>(flow: Flow<Input, Output>): ChainFlow<Input, Output> => build<Input, Input, Output>(
    (input: Input): Input => input,
    flow,
);

export { ChainFlow };
export default chain;

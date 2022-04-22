import Flow, { FlowInput } from './Flow';

const duplicate = <
    Input extends FlowInput = FlowInput,
    Flows extends Flow<Input>[] = Flow<Input>[],
>(flows: Flows): Flow<Input, Input> => {
    const duplicateFlow: Flow<Input, Input> = (input: Input): Input => {
        setImmediate(() => {
            for (const flow of flows) {
                flow(input);
            }
        });

        return input;
    };

    duplicateFlow.id = 'duplicate';
    return duplicateFlow;
};

export default duplicate;

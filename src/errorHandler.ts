import Flow, { FlowInput } from './Flow';

type ErrorOutput<InputFlow, Input, Error> = { error: Error, flow: InputFlow, input: Input };

class ErrorFromUnknownType extends Error {
    value: any;

    constructor(value: any) {
        super('Unknown error type');
        this.value = value;
        this.name = 'ErrorFromUnknownType';
    }
}

const errorHandler = <
    Input extends FlowInput = FlowInput,
    FlowError extends Error = Error,
>(
    flow: Flow<Input, any>,
    errorFlow: Flow<ErrorOutput<Flow<Input, any>, Input, FlowError | ErrorFromUnknownType>, any>,
): Flow<Input, Input> => {
    const errorHandlerFlow: Flow<Input, Input> = async (input: Input): Promise<Input> => {
        try {
            await flow(input);
        } catch (error: FlowError | any) {
            await errorFlow({
                error: error instanceof Error ? (error as FlowError) : new ErrorFromUnknownType(error),
                flow,
                input,
            });
        }

        return input;
    };

    errorHandlerFlow.id = 'errorHandler';
    return errorHandlerFlow;
};

export { ErrorOutput, ErrorFromUnknownType };
export default errorHandler;

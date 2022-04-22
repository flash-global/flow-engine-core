import { errorHandler, ErrorFromUnknownType, ErrorOutput } from '../../src';
import { Flow } from '../../src';

describe('Test errorHandler', () => {
    test('No error handled', async () => {
        type DataInput = { value: number };
        let hasThrown = false;

        const errorHandlerFlow = errorHandler<DataInput>(
            async (input: DataInput): Promise<DataInput> => {
                expect(input).toStrictEqual({ value: 5 });
                return input;
            },
            async (): Promise<void> => {
                hasThrown = true;
            },
        );

        expect(errorHandlerFlow.id).toStrictEqual('errorHandler');
        expect(await errorHandlerFlow({ value: 5 })).toStrictEqual({ value: 5 });
        expect(hasThrown).toBeFalsy();
    });

    test('Error handled', async () => {
        type DataInput = { value: number };
        let hasThrown = false;

        const flow: Flow<DataInput, DataInput> = async (input: DataInput): Promise<DataInput> => {
            expect(input).toStrictEqual({ value: 5 });
            throw new Error('My error');
        };

        flow.id = 'error-throw-flow';

        const errorHandlerFlow = errorHandler<DataInput>(
            flow,
            async (input: ErrorOutput<Flow<DataInput, DataInput>, DataInput, Error>): Promise<void> => {
                expect(input.flow.id).toStrictEqual(flow.id);
                expect(input.input).toStrictEqual({ value: 5 });
                expect(input.error.message).toStrictEqual('My error');
                hasThrown = true;
            },
        );

        expect(errorHandlerFlow.id).toStrictEqual('errorHandler');
        expect(await errorHandlerFlow({ value: 5 })).toStrictEqual({ value: 5 });
        expect(hasThrown).toBeTruthy();
    });

    test('Error from unknown type handled', async () => {
        type DataInput = { value: number };
        let hasThrown = false;

        const flow: Flow<DataInput, DataInput> = async (input: DataInput): Promise<DataInput> => {
            expect(input).toStrictEqual({ value: 5 });
            /* eslint-disable @typescript-eslint/no-throw-literal */
            throw input;
        };

        flow.id = 'error-throw-flow';

        const errorHandlerFlow = errorHandler<DataInput>(
            flow,
            async (input: ErrorOutput<Flow<DataInput, DataInput>, DataInput, Error | ErrorFromUnknownType>): Promise<void> => {
                expect(input.flow.id).toStrictEqual(flow.id);
                expect(input.input).toStrictEqual({ value: 5 });

                const error = input.error as ErrorFromUnknownType;

                expect(error.value).toStrictEqual({ value: 5 });
                expect(error.name).toStrictEqual('ErrorFromUnknownType');
                expect(error.message).toStrictEqual('Unknown error type');

                hasThrown = true;
            },
        );

        expect(errorHandlerFlow.id).toStrictEqual('errorHandler');
        expect(await errorHandlerFlow({ value: 5 })).toStrictEqual({ value: 5 });
        expect(hasThrown).toBeTruthy();
    });

    test('Error handled but throw again', async () => {
        type DataInput = { value: number };

        const flow: Flow<DataInput, DataInput> = async (input: DataInput): Promise<DataInput> => {
            expect(input).toStrictEqual({ value: 5 });
            throw new Error('My error');
        };

        flow.id = 'error-throw-flow';

        const errorHandlerFlow = errorHandler<DataInput>(
            flow,
            async (input: ErrorOutput<Flow<DataInput, DataInput>, DataInput, Error>): Promise<void> => {
                expect(input.flow.id).toStrictEqual(flow.id);
                expect(input.input).toStrictEqual({ value: 5 });
                expect(input.error.message).toStrictEqual('My error');
                throw input.error;
            },
        );

        expect(errorHandlerFlow.id).toStrictEqual('errorHandler');
        await expect(() => errorHandlerFlow({ value: 5 })).rejects.toThrow('My error');
    });
});

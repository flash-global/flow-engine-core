/* eslint-disable @typescript-eslint/indent */
// indent check disabled because of: https://github.com/typescript-eslint/typescript-eslint/issues/1824
import { chain, ChainFlow } from '../../src';

describe('Test chain', () => {
    test('Chain with 0 step', async () => {
        type InitialStep = { value1: number };

        const chainFlow: ChainFlow<InitialStep, InitialStep> = chain<InitialStep>();

        expect(chainFlow.id).toStrictEqual('chain');
        expect(await chainFlow({ value1: 5 })).toStrictEqual({ value1: 5 });
    });

    test('Chain with 1 step', async () => {
        type InitialStep = { value1: number };
        type Step1Output = InitialStep & { value2: string };

        const chainFlow: ChainFlow<InitialStep, Step1Output> = chain<InitialStep>()
            .add<Step1Output>(
            async (input: InitialStep): Promise<Step1Output> => {
                expect(input).toStrictEqual({ value1: 5 });
                return { ...input, value2: 'a' };
            })
        ;

        expect(chainFlow.id).toStrictEqual('chain');
        expect(await chainFlow({ value1: 5 })).toStrictEqual({ value1: 5, value2: 'a' });
    });

    test('Chain with 2 steps', async () => {
        type InitialStep = { value1: number };
        type Step1Output = InitialStep & { value2: string };
        type Step2Output = Step1Output & { value3: object };

        const chainFlow: ChainFlow<InitialStep, Step2Output> = chain<InitialStep>()
            .add<Step1Output>(
            async (input: InitialStep): Promise<Step1Output> => {
                expect(input).toStrictEqual({ value1: 5 });
                return { ...input, value2: 'a' };
            })
            .add<Step2Output>(async (input: Step1Output): Promise<Step2Output> => {
                expect(input).toStrictEqual({ value1: 5, value2: 'a' });
                return { ...input, value3: { h: 'e' } };
            })
        ;

        expect(chainFlow.id).toStrictEqual('chain');
        expect(await chainFlow({ value1: 5 })).toStrictEqual({ value1: 5, value2: 'a', value3: { h: 'e' } });
    });

    test('Chain with 3 steps', async () => {
        type InitialStep = { value1: number };
        type Step1Output = InitialStep & { value2: string };
        type Step2Output = Step1Output & { value3: object };
        type Step3Output = Step2Output & { value4: Date };

        const date = new Date();

        const chainFlow: ChainFlow<InitialStep, Step3Output> = chain<InitialStep>()
            .add<Step1Output>(
            async (input: InitialStep): Promise<Step1Output> => {
                expect(input).toStrictEqual({ value1: 5 });
                return { ...input, value2: 'a' };
            })
            .add<Step2Output>(async (input: Step1Output): Promise<Step2Output> => {
                expect(input).toStrictEqual({ value1: 5, value2: 'a' });
                return { ...input, value3: { h: 'e' } };
            })
            .add<Step3Output>(async (input: Step2Output): Promise<Step3Output> => {
                expect(input).toStrictEqual({ value1: 5, value2: 'a', value3: { h: 'e' } });
                return { ...input, value4: date };
            })
        ;

        expect(chainFlow.id).toStrictEqual('chain');
        expect(await chainFlow({ value1: 5 })).toStrictEqual({
            value1: 5,
            value2: 'a',
            value3: { h: 'e' },
            value4: date,
        });
    });
});

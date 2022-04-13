import { duplicate } from '../../src';
import { Flow } from '../../src';

describe('Test duplicate', () => {
    test('success', async () => {
        type DataInput = { value: number };

        const duplicateFlow = duplicate<DataInput, Flow<DataInput, DataInput>[]>([
            async (input: DataInput) => {
                expect(input).toStrictEqual({ value: 5 });
                return input;
            },
            async (input: DataInput) => {
                expect(input).toStrictEqual({ value: 5 });
                return input;
            },
            async (input: DataInput) => {
                expect(input).toStrictEqual({ value: 5 });
                return input;
            },
        ]);

        expect(duplicateFlow.id).toStrictEqual('duplicate');
        expect(await duplicateFlow({ value: 5 })).toStrictEqual({ value: 5 });
        await new Promise((resolve) => setImmediate(resolve));
    });
});

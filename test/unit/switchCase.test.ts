import { switchCase } from '../../src';

describe('Test switchCase', () => {
    test('Evaluate one - case 1 matched', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async function (input: DataInput): Promise<void> {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 5, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 5 });
                    case3Matched = true;
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
            },
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateOneSwitchCase');
        await expect(await switchCaseFlow({ value: 1 })).toStrictEqual({ value: 1 });

        expect(case1Matched).toBeTruthy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeFalsy();
    });

    test('Evaluate one - case 2 matched', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 5, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 5 });
                    case3Matched = true;
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
            },
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateOneSwitchCase');
        await expect(await switchCaseFlow({ value: 3 })).toStrictEqual({ value: 3 });

        expect(case1Matched).toBeFalsy();
        expect(case2Matched).toBeTruthy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeFalsy();
    });

    test('Evaluate one - case 3 matched', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 5, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 5 });
                    case3Matched = true;
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
            },
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateOneSwitchCase');
        await expect(await switchCaseFlow({ value: 5 })).toStrictEqual({ value: 5 });

        expect(case1Matched).toBeFalsy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeTruthy();
        expect(defaultMatched).toBeFalsy();
    });

    test('Evaluate one - default matched', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 5, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 5 });
                    case3Matched = true;
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
            },
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateOneSwitchCase');
        await expect(await switchCaseFlow({ value: 7 })).toStrictEqual({ value: 7 });

        expect(case1Matched).toBeFalsy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeTruthy();
    });

    test('Evaluate all - case 1 & 3 matched', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case3Matched = true;
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
            },
            true,
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateAllSwitchCase');
        await expect(await switchCaseFlow({ value: 1 })).toStrictEqual({ value: 1 });

        expect(case1Matched).toBeTruthy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeTruthy();
        expect(defaultMatched).toBeFalsy();
    });

    test('Evaluate all - defaulted matched', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                } },
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case3Matched = true;
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
            },
            true,
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateAllSwitchCase');
        await expect(await switchCaseFlow({ value: 7 })).toStrictEqual({ value: 7 });

        expect(case1Matched).toBeFalsy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeTruthy();
    });

    test('Evaluate one - case 1 throw Error', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                    throw new Error('Error 1');
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                    throw new Error('Error 2');
                } },
                { fn: (input: DataInput) => input.value === 5, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 5 });
                    case3Matched = true;
                    throw new Error('Error 3');
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
                throw new Error('Error default');
            },
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateOneSwitchCase');
        await expect(() => switchCaseFlow({ value: 1 })).rejects.toThrow('Error 1');

        expect(case1Matched).toBeTruthy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeFalsy();
    });

    test('Evaluate one - default throw Error', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                    throw new Error('Error 1');
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                    throw new Error('Error 2');
                } },
                { fn: (input: DataInput) => input.value === 5, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 5 });
                    case3Matched = true;
                    throw new Error('Error 3');
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
                throw new Error('Error default');
            },
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateOneSwitchCase');
        await expect(() => switchCaseFlow({ value: 7 })).rejects.toThrow('Error default');

        expect(case1Matched).toBeFalsy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeTruthy();
    });

    test('Evaluate all - case 1 throw Error', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                    throw new Error('Error 1');
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                    throw new Error('Error 2');
                } },
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case3Matched = true;
                    throw new Error('Error 3');
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
                throw new Error('Error default');
            },
            true,
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateAllSwitchCase');
        await expect(() => switchCaseFlow({ value: 1 })).rejects.toThrow('Error 1');

        expect(case1Matched).toBeTruthy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeFalsy();
    });

    test('Evaluate all - default throw Error', async () => {
        type DataInput = { value: number };
        let case1Matched = false;
        let case2Matched = false;
        let case3Matched = false;
        let defaultMatched = false;

        const switchCaseFlow = switchCase<DataInput>(
            [
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case1Matched = true;
                    throw new Error('Error 1');
                } },
                { fn: (input: DataInput) => input.value === 3, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 3 });
                    case2Matched = true;
                    throw new Error('Error 2');
                } },
                { fn: (input: DataInput) => input.value === 1, flow: async (input: DataInput): Promise<void> => {
                    expect(input).toStrictEqual({ value: 1 });
                    case3Matched = true;
                    throw new Error('Error 3');
                } },
            ],
            async (input: DataInput): Promise<void> => {
                expect(input).toStrictEqual({ value: 7 });
                defaultMatched = true;
                throw new Error('Error default');
            },
            true,
        );

        expect(switchCaseFlow.id).toStrictEqual('evaluateAllSwitchCase');
        await expect(() => switchCaseFlow({ value: 7 })).rejects.toThrow('Error default');

        expect(case1Matched).toBeFalsy();
        expect(case2Matched).toBeFalsy();
        expect(case3Matched).toBeFalsy();
        expect(defaultMatched).toBeTruthy();
    });
});

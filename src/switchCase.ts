import Flow, { FlowInput } from './Flow';

type Case<Input extends FlowInput = FlowInput> = {
    fn: (input: Input) => boolean,
    flow: Flow<Input, any>,
};

const evaluateAllSwitchCase = <
    Input extends FlowInput = FlowInput,
    Cases extends Array<Case<Input>> = Array<Case<Input>>,
    DefaultFlow extends Flow<Input, any> = Flow<Input, any>,
>(cases: Cases, defaultFlow?: DefaultFlow): Flow<Input, Input> => {
    const evaluateAllSwitchCaseFlow: Flow<Input, Input> = async (input: Input): Promise<Input> => {
        let atLeastOnePass = false;

        for (const caseTest of cases) {
            if (caseTest.fn(input)) {
                await caseTest.flow(input);
                atLeastOnePass = true;
            }
        }

        if (!atLeastOnePass && defaultFlow !== undefined) {
            await defaultFlow(input);
        }

        return input;
    };

    evaluateAllSwitchCaseFlow.id = 'evaluateAllSwitchCase';
    return evaluateAllSwitchCaseFlow;
};

const evaluateOneSwitchCase = <
    Input extends FlowInput = FlowInput,
    Cases extends Array<Case<Input>> = Array<Case<Input>>,
    DefaultFlow extends Flow<Input, any> = Flow<Input, any>,
>(cases: Cases, defaultFlow?: DefaultFlow): Flow<Input, Input> => {
    const evaluateOneSwitchCaseFlow: Flow<Input, Input> = async (input: Input): Promise<Input> => {
        for (const caseTest of cases) {
            if (caseTest.fn(input)) {
                await caseTest.flow(input);
                return input;
            }
        }

        if (defaultFlow !== undefined) {
            await defaultFlow(input);
        }

        return input;
    };

    evaluateOneSwitchCaseFlow.id = 'evaluateOneSwitchCase';
    return evaluateOneSwitchCaseFlow;
};

const switchCase = <
    Input extends FlowInput = FlowInput,
    Cases extends Array<Case<Input>> = Array<Case<Input>>,
    DefaultFlow extends Flow<Input, any> = Flow<Input, any>,
>(cases: Cases, defaultFlow?: DefaultFlow, evaluateAll: boolean = false): Flow<Input, Input> => {
    return evaluateAll ?
        evaluateAllSwitchCase<Input, Cases, DefaultFlow>(cases, defaultFlow)
        : evaluateOneSwitchCase<Input, Cases, DefaultFlow>(cases, defaultFlow);
};

export { Case };
export default switchCase;

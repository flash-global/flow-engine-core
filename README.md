# flow-engine-core

flow-engine-core exposes the Flow interface and the basic flows.

## Installation

- npm i @flow-engine/core

## Flows

### chain

The chain flow allows you to chain multiple flow.
With the optional generic types, you are able to check the types between each flow of you chain.

Without any added flow, the chain will return the input.

#### Example with typescript

```typescript
import { chain, Flow } from '@flow-engine/core';

type Input = {};

type Step1Output = Input & { value1: string };
type Step2Output = Step1Output & { value2: number };
type Step3Output = Step2Output & { value3: Date };

type Output = Step3Output;

const flow: Flow<Input, Output> = chain<Input>()
    .add<Step1Output>(async (input: Input): Promise<Step1Output> => ({ ...input, value1: 'a' }))
    .add<Step2Output>(async (input: Step1Output): Promise<Step2Output> => ({ ...input, value2: 123 }))
    .add<Step3Output>(async (input: Step2Output): Promise<Step3Output> => ({ ...input, value3: new Date() }))
;

flow({}).then((input: Output): void => {
    console.log(input);
});
```

#### Example with javascript

```javascript
const { chain } = require('@flow-engine/core')

const flow = chain()
    .add(async (input) => ({ ...input, value1: 'a' }))
    .add(async (input) => ({ ...input, value2: 123 }))
    .add(async (input) => ({ ...input, value3: new Date() }))
;

flow({}).then((input) => {
    console.log(input);
});
```

### duplicate

The duplicate flow allows you to dispatch one input into multiple flows.

#### Example with typescript

```typescript
import { duplicate, Flow } from '@flow-engine/core';

type Input = { value: number };

const flow: Flow<Input, Input> = duplicate<Input, Flow<Input, Input>[]>([
    async (input: Input): Promise<Input> => {
        console.log('f1 ' + input.value);
        return input;
    },
    async (input: Input): Promise<Input> => {
        console.log('f2 ' + input.value);
        return input;
    },
    async (input: Input): Promise<Input> => {
        console.log('f3 ' + input.value);
        return input;
    },
]);

flow({ value: 5 }).then(() => {
    console.log('done');
});
```

#### Example with javascript

```javascript
const { duplicate } = require('@flow-engine/core');

const flow = duplicate([
    async (input) => {
        console.log('f1 ' + input.value);
        return input;
    },
    async (input) => {
        console.log('f2 ' + input.value);
        return input;
    },
    async (input) => {
        console.log('f3 ' + input.value);
        return input;
    },
]);

flow({ value: 5 }).then(() => {
    console.log('done');
});
```

### errorHandler

The errorHandler flow allows you to execute a flow to catch any error thrown by the flow.
The error is then passed into another flow.

#### Example with typescript

```typescript
import { errorHandler, ErrorOutput, Flow } from '@flow-engine/core';

type Input = { value: number };

const testFlow: Flow<Input, Input> = async (input: Input): Promise<Input> => {
    if (input.value === 2) {
        throw new Error('Wrong value');
    }

    return input;
};

testFlow.id = 'testFlow';

type ErrorInput = ErrorOutput<typeof testFlow, Input, Error>;

const onErrorFlow: Flow<ErrorInput, Input> = async (errorOutput: ErrorInput): Promise<Input> => {
    console.error('Error from ' + errorOutput.flow.id + ' -> ' + errorOutput.error.message);
    return errorOutput.input;
};

const flow: Flow<Input, any> = errorHandler<Input, Error>(testFlow, onErrorFlow);

flow({ value: 1 })
    .then(() => {
        console.log('1 done');
    })
    .then(() => flow({ value: 2 }))
    .then(() => {
        console.log('2 done');
    })
;
```

#### Example with javascript

```javascript
const { errorHandler } = require('@flow-engine/core');

const testFlow = async (input) => {
    if (input.value === 2) {
        throw new Error('Wrong value');
    }

    return input;
};

testFlow.id = 'testFlow';

const onErrorFlow = async (errorOutput) => {
    console.error('Error from ' + errorOutput.flow.id + ' -> ' + errorOutput.error.message);
    return errorOutput.input;
};

const flow = errorHandler(testFlow, onErrorFlow);

flow({ value: 1 })
    .then(() => {
        console.log('1 done');
    })
    .then(() => flow({ value: 2 }))
    .then(() => {
        console.log('2 done');
    })
;
```

### switchCase

The switchCase flow allows you to execute one or multiple cases with an input.
The switchCase is constructed with a list of cases, and a case is an object composed of:
- fn: the function that takes the input and return a boolean.
- flow: the flow to executes if the "fn" function returns true. The flow is executed with the switchCase input.

The switchCase accepts an optional default flow.
This default flow is executed if none of the cases is executed, and with the switchCase input.

The switchCase is composed of 2 modes: "evaluate one" and "evaluate all":
- "evaluate one": the switchCase is stopped on the first matched and executed case
- "evaluate all": all matched cases will be executed

#### Example with typescript

```typescript
import { switchCase, Case, Flow } from '@flow-engine/core';

type Input = { value: number };

const defaultFlow: Flow<Input, Input> = async (input: Input): Promise<Input> => {
    console.log('default case matched with ' + input.value);
    return input;
};

const cases: Case<Input>[] = [
    {
        fn: (input: Input): boolean => input.value === 1 || input.value === 3,
        flow: async (input: Input): Promise<Input> => {
            console.log('case 1 matched with ' + input.value);
            return input;
        },
    },
    {
        fn: (input: Input): boolean => input.value === 2 || input.value === 3,
        flow: async (input: Input): Promise<Input> => {
            console.log('case 2 matched with ' + input.value);
            return input;
        },
    },
];

const evaluateOneSwitchCase = switchCase<Input>(cases, defaultFlow);
const evaluateAllSwitchCase = switchCase<Input>(cases, defaultFlow, true);

evaluateOneSwitchCase({ value: 1 })
    .then(() => evaluateOneSwitchCase({ value: 2 }))
    .then(() => evaluateOneSwitchCase({ value: 4 }))
    .then(() => evaluateAllSwitchCase({ value: 1 }))
    .then(() => evaluateAllSwitchCase({ value: 2 }))
    .then(() => evaluateAllSwitchCase({ value: 3 }))
    .then(() => evaluateAllSwitchCase({ value: 4 }))
;
```

#### Example with javascript

```javascript
const { switchCase } = require('@flow-engine/core');

const defaultFlow = async (input) => {
    console.log('default case matched with ' + input.value);
    return input;
};

const cases = [
    {
        fn: (input) => input.value === 1 || input.value === 3,
        flow: async (input) => {
            console.log('case 1 matched with ' + input.value);
            return input;
        },
    },
    {
        fn: (input) => input.value === 2 || input.value === 3,
        flow: async (input) => {
            console.log('case 2 matched with ' + input.value);
            return input;
        },
    },
];

const evaluateOneSwitchCase = switchCase(cases, defaultFlow);
const evaluateAllSwitchCase = switchCase(cases, defaultFlow, true);

evaluateOneSwitchCase({ value: 1 })
    .then(() => evaluateOneSwitchCase({ value: 2 }))
    .then(() => evaluateOneSwitchCase({ value: 4 }))
    .then(() => evaluateAllSwitchCase({ value: 1 }))
    .then(() => evaluateAllSwitchCase({ value: 2 }))
    .then(() => evaluateAllSwitchCase({ value: 3 }))
    .then(() => evaluateAllSwitchCase({ value: 4 }))
;
```

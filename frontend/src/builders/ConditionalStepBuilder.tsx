import React, {useState} from 'react';

export interface StepHandlerProps<T> {
    context: T;
    setContext: (context: T) => void;
}

interface StepWithHandler<T> {
    component: React.FC<StepHandlerProps<T>>
    getVisibleStep?: (context: T) => StepWithHandler<T> | undefined
}

export interface StepChain {
    currentStepIndex: number
}

export class ConditionalStepBuilder<T> {
    readonly steps: StepWithHandler<T>[] = []

    add(step: React.FC<StepHandlerProps<T>>, getVisibleStep?: (context: any) => StepWithHandler<T> | undefined): ConditionalStepBuilder<T> {
        this.steps.push({component: step, getVisibleStep})
        return this;
    }

    build(initialContext: T) {
        const steps = this.steps

        return function StepChain({currentStepIndex}: StepChain) {
            const [context, setContext] = useState(initialContext);

            const step = steps[currentStepIndex];
            const visibleStep = step.getVisibleStep ? step.getVisibleStep(context) : step;

            if (visibleStep) {
                const StepComponent = visibleStep.component;
                return <StepComponent context={context} setContext={setContext}/>;
            }

            return null;
        };
    }
}
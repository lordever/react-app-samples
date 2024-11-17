import React, {useState} from 'react';

export enum StepPosition {
    NEXT = "next",
    BACK = "back"
}

export interface StepHandlerProps<T> {
    context: T;
    setContext: (context: T) => void;
    onStepChange: (position: StepPosition) => void;
    onClose: () => void;
}

interface StepWithHandler<T> {
    component: React.FC<StepHandlerProps<T>>
    getVisibleStep?: (context: T) => StepWithHandler<T> | undefined
}

export interface StepChain {
    currentStepIndex: number,
    onClose: () => void;
    onStepIndexChange: (stepIndex: number) => void;
}

export class ConditionalStepBuilder<T> {
    readonly steps: StepWithHandler<T>[] = []

    add(step: React.FC<StepHandlerProps<T>>, getVisibleStep?: (context: any) => StepWithHandler<T> | undefined): this {
        this.steps.push({component: step, getVisibleStep})
        return this;
    }

    build(initialContext: T): ({
                                   currentStepIndex,
                                   onStepIndexChange,
                                   onClose
                               }: StepChain) => (React.JSX.Element | null) {
        const steps = this.steps

        return function StepChain({currentStepIndex, onStepIndexChange, onClose}: StepChain) {
            const [context, setContext] = useState(initialContext);

            const step = steps[currentStepIndex];
            const visibleStep = step.getVisibleStep ? step.getVisibleStep(context) : step;

            if (visibleStep) {
                const StepComponent = visibleStep.component;

                const handleStepChange = (position: StepPosition) => {
                    if (position === StepPosition.NEXT) {
                        onStepIndexChange(currentStepIndex + 1);
                    }

                    if (position === StepPosition.BACK) {
                        onStepIndexChange(currentStepIndex - 1);
                    }
                }

                return <StepComponent
                    context={context}
                    setContext={setContext}
                    onClose={onClose}
                    onStepChange={handleStepChange}
                />;
            }

            return null;
        };
    }
}
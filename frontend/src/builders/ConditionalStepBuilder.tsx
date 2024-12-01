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
    isVisible?: (context: T) => boolean
}

export interface StepChain {
    currentStepIndex: number,
    onClose: () => void;
    onStepIndexChange: (stepIndex: number) => void;
}

export class ConditionalStepBuilder<T> {
    readonly steps: StepWithHandler<T>[] = []

    add(step: React.FC<StepHandlerProps<T>>, getVisibleStep?: (context: T) => boolean): this {
        this.steps.push({component: step, isVisible: getVisibleStep})
        return this;
    }

    build(initialContext: T): ({
                                   currentStepIndex,
                                   onStepIndexChange,
                                   onClose,
                               }: StepChain) => React.JSX.Element | null {
        const steps = this.steps;

        return function StepChain({
                                      currentStepIndex,
                                      onStepIndexChange,
                                      onClose,
                                  }: StepChain): React.JSX.Element | null {
            const [context, setContext] = useState(initialContext);

            const getNextVisibleStepIndex = (currentIndex: number): number | null => {
                for (let i = currentIndex + 1; i < steps.length; i++) {
                    const step = steps[i];
                    if (!step.isVisible || step.isVisible(context)) {
                        return i;
                    }
                }
                return null;
            };

            const step = steps[currentStepIndex];
            const visibleStep = step.isVisible ? step.isVisible(context) : true;

            if (!visibleStep) {
                const nextIndex = getNextVisibleStepIndex(currentStepIndex);
                if (nextIndex !== null) {
                    onStepIndexChange(nextIndex);
                }

                return null;
            }

            const StepComponent = step.component;
            const handleStepChange = (position: StepPosition) => {
                if (position === StepPosition.NEXT) {
                    const nextIndex = getNextVisibleStepIndex(currentStepIndex);
                    if (nextIndex !== null) {
                        onStepIndexChange(nextIndex);
                    }
                }

                if (position === StepPosition.BACK) {
                    onStepIndexChange(currentStepIndex - 1);
                }
            };

            return (
                <StepComponent
                    context={context}
                    setContext={setContext}
                    onClose={onClose}
                    onStepChange={handleStepChange}
                />
            );
        };
    }
}
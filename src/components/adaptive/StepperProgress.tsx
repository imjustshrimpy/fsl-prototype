import React from 'react';

export interface StepperItem {
  step: number;
  labelKey: string;
}

interface StepperProgressProps {
  steps: StepperItem[];
  activeStep: number;
  t: (key: string) => string;
}

export const StepperProgress: React.FC<StepperProgressProps> = ({ steps, activeStep, t }) => {
  return (
    <div className="w-full">
      <div className="flex items-start gap-1">
        {steps.map((item, index) => {
          const isCompleted = item.step < activeStep;
          const isActive = item.step === activeStep;
          const isUpcoming = item.step > activeStep;

          return (
            <React.Fragment key={item.step}>
              {index > 0 && (
                <div
                  className={`mt-4 h-1 flex-1 rounded-full ${
                    item.step <= activeStep ? 'stepper-track-complete' : 'stepper-track-base'
                  }`}
                  aria-hidden="true"
                />
              )}

              <div className="flex min-w-0 max-w-[120px] flex-1 flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-caption-adaptive font-bold ${
                    isCompleted
                      ? 'stepper-node-complete'
                      : isActive
                      ? 'stepper-node-active'
                      : 'stepper-node-upcoming'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? '✓' : item.step}
                </div>

                <div
                  className={`mt-2 min-h-[2.5rem] text-center text-[10px] font-bold leading-tight ${
                    isCompleted
                      ? 'stepper-label-complete'
                      : isActive
                      ? 'stepper-label-active'
                      : isUpcoming
                      ? 'stepper-label-upcoming'
                      : 'text-text-secondary'
                  }`}
                >
                  {t(item.labelKey)}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

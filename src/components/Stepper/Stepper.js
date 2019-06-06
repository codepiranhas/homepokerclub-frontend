import React from 'react';
import PropTypes from 'prop-types';
import './Stepper.css';

function ProgressStep({ label, isComplete, isActive }) {
  return (
    <li className={(isComplete ? "is-complete" : isActive ? "is-active" : '')}><span>{label}</span></li>  
  )
}

function Stepper({ currentStep, steps }) {
  return (
    <section>
      <ol className="progress-bar">
        {steps.map((step, i) => {
          return (
            <ProgressStep
              key={step.id}
              label={step.label}
              isActive={currentStep === i}
              isComplete={currentStep > i}
            />
          )
        })}
      </ol>
    </section>
  );
}

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
};

Stepper.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: 'normal',
  isDisabled: false,
}

export { Stepper };
export default Stepper;
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Seleção de produtos', 'Detalhes do pagamento', 'Finalização da compra'];

type Props = {
  currentStep : number
};

export default function HorizontalStepper({currentStep}: Props) {  

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Stepper activeStep={currentStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
    </Box>
  );
}
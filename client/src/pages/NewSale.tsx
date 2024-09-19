import React from "react";
import MiniDrawer from "../components/MiniDrawer";
import HorizontalStepper from "../components/HorizontalStepper";
import ProductsTable from "../components/ProductsTable";
import StepperButtons from "../components/StepperButtons";
import NewSaleForm from "../components/NewSaleForm";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function NewSale() {
    const [currentStep, setCurrentStep] = React.useState(0);

    const [stepComponent, setStepComponent] = React.useState(<></>);

    const [selecionedProducts, setSelecionedProducts] =
        React.useState<GridRowSelectionModel>([]);

    const handleNext = () => {
        setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
    };

    const handleReset = () => {
        setCurrentStep(0);
    };

    const windowByStep = () => {
        switch (currentStep) {
            case 0:
                setStepComponent(
                    <>
                        <ProductsTable
                            selecionedProducts={selecionedProducts}
                            setSelecionedProducts={setSelecionedProducts}
                        />
                        <StepperButtons
                            currentStep={currentStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            handleReset={handleReset}
                        />
                    </>
                );

                break;
            case 1:
                setStepComponent(
                    <>
                        <NewSaleForm />
                        <StepperButtons
                            currentStep={currentStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            handleReset={handleReset}
                        />
                    </>
                );
                break;
            case 2:
                setStepComponent(
                    <>
                        333333333
                        <StepperButtons
                            currentStep={currentStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            handleReset={handleReset}
                        />
                    </>
                );
                break;
            default:
                setStepComponent(
                    <>
                        <ProductsTable
                            selecionedProducts={selecionedProducts}
                            setSelecionedProducts={setSelecionedProducts}
                        />
                        <StepperButtons
                            currentStep={currentStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            handleReset={handleReset}
                        />
                    </>
                );
                break;
        }
    };

    React.useEffect(() => {
        windowByStep();
        console.log(selecionedProducts);
    }, [currentStep]);

    return (
        <div>
            <MiniDrawer>
                <>
                    <HorizontalStepper currentStep={currentStep} />
                    {stepComponent}
                </>
            </MiniDrawer>
        </div>
    );
}

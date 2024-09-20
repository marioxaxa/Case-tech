import React from "react";
import MiniDrawer from "../components/MiniDrawer";
import HorizontalStepper from "../components/HorizontalStepper";
import ProductsTable from "../components/ProductsTable";
import StepperButtons from "../components/StepperButtons";
import NewSaleForm from "../components/NewSaleForm";
import { ProductQuantityT } from "../types/ProductQuantityT";

export default function NewSale() {
    const [currentStep, setCurrentStep] = React.useState(0);

    const [stepComponent, setStepComponent] = React.useState(<></>);

    const [selecionedProducts, setSelecionedProducts] =
        React.useState<ProductQuantityT>({});

    const nextButtonRef = React.useRef(null);

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
                    <ProductsTable
                        selecionedProducts={selecionedProducts}
                        setSelecionedProducts={setSelecionedProducts}
                    />
                );

                break;
            case 1:
                setStepComponent(
                    <NewSaleForm
                        selecionedProducts={selecionedProducts}
                        refButton={nextButtonRef}
                        handleNext={handleNext}
                    />
                );
                break;
            case 2:
                setStepComponent(<>333333333</>);
                break;
            default:
                setStepComponent(
                    <ProductsTable
                        selecionedProducts={selecionedProducts}
                        setSelecionedProducts={setSelecionedProducts}
                    />
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
                    <StepperButtons
                        currentStep={currentStep}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        handleReset={handleReset}
                        refButton={nextButtonRef}
                    />
                </>
            </MiniDrawer>
        </div>
    );
}

import React from "react";
import MiniDrawer from "../components/MiniDrawer";
import HorizontalStepper from "../components/HorizontalStepper";
import ProductsTable from "../components/ProductsTable";
import StepperButtons from "../components/StepperButtons";
import NewSaleForm, { InputsT } from "../components/NewSaleForm";
import { ProductQuantityT } from "../types/ProductQuantityT";
import NewSaleConfirmation from "../components/NewSaleConfirmation";
import { redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NewSale() {
    const { auth } = useAuth();

    const loader = async () => {
        if (!auth.isAuthenticated) {
            return redirect("/Home");
        }
        return null;
    };

    loader()

    const [currentStep, setCurrentStep] = React.useState(0);

    const [stepComponent, setStepComponent] = React.useState(<></>);

    const [selecionedProducts, setSelecionedProducts] =
        React.useState<ProductQuantityT>({});

    const [saleData, setSaleData] = React.useState<InputsT>({
        is_cash_payment: 0,
        discount: 0,
        extra: 0,
        state: "",
    });

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
                        saleData={saleData}
                        setSaleData={setSaleData}
                    />
                );
                break;
            case 2:
                setStepComponent(
                    <NewSaleConfirmation
                        selecionedProducts={selecionedProducts}
                        saleData={saleData}
                    />
                );
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

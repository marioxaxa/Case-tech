import { Typography, Box, Button } from "@mui/material";
import React from "react";

type Props = {
    currentStep: number;
    handleNext: () => void;
    handleBack: () => void;
    handleReset: () => void;
    refButton: React.MutableRefObject<null>
};

const steps = [
    "Seleção de produtos",
    "Detalhes do pagamento",
    "Finalização da compra",
];

export default function StepperButtons({
    currentStep,
    handleNext,
    handleBack,
    handleReset,
    refButton
}: Props) {

    const [buttonComponent, setButtonComponent] = React.useState(<></>)



    const portalButton = () => {
        if (currentStep == 1) {
            setButtonComponent(
                <Box ref={refButton} />
            );
        } else {
            setButtonComponent(
                <Button onClick={handleNext}>
                    {currentStep === steps.length - 1
                        ? "Finalizar compra"
                        : "Proximo"}
                </Button>
            );
        }
    };

    React.useEffect(() => {
        portalButton()
    },[currentStep])

    return (
        <>
            {currentStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Compra finalizada com sucesso
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Nova compra</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={currentStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Voltar
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {buttonComponent}
                    </Box>
                </React.Fragment>
            )}
        </>
    );
}

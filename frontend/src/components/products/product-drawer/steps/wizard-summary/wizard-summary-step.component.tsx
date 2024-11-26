import React, {FC} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../../model/product-flow.model";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";
import WizardToolbar from "../../../../wizard-drawer/wizard-toolbar.component";
import {selectProductPurchaseQuote} from "../../../../../store/product-purchase-flow/product-purchase-flow.selector";

const WizardSummaryStep: FC<StepHandlerProps<ProductFlowModel>> = ({onClose, onStepChange}) => {
    const quote = useSelector(selectProductPurchaseQuote);

    return (
        <Box display="flex" flexDirection="column">
            <p>{quote?.name}</p>

            <WizardToolbar
                onClose={onClose}
                onBack={() => onStepChange(StepPosition.BACK)}
            />
        </Box>
    );
};

export default WizardSummaryStep;
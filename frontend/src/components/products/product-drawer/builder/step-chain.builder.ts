import {ConditionalStepBuilder} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import ProductSummaryStep from "../steps/product-summary/product-summary-step.component";
import WizardSummaryStep from "../steps/wizard-summary/wizard-summary-step.component";

const StepChainBuilder = new ConditionalStepBuilder<ProductFlowModel>()
    .add(ProductSummaryStep)
    .add(WizardSummaryStep);

export default StepChainBuilder;
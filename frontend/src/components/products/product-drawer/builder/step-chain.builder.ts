import {ConditionalStepBuilder} from "../../../../builders/ConditionalStepBuilder";
import {BundleFlowModel} from "../model/bundle-flow.model";
import InitBundleStep from "../steps/init-bundle/init-bundle-step.component";
import SubmitSummaryStep from "../steps/submit-summary/submit-summary-step.component";

const StepChainBuilder = new ConditionalStepBuilder<BundleFlowModel>()
    .add(InitBundleStep)
    .add(SubmitSummaryStep);

export default StepChainBuilder;
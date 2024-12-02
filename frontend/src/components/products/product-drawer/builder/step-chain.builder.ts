import {ConditionalStepBuilder} from "../../../../builders/ConditionalStepBuilder";
import {BundleFlowModel} from "../model/bundle-flow.model";
import InitBundleStep from "../steps/init-bundle/init-bundle-step.component";
import SubmitSummaryStep from "../steps/submit-summary/submit-summary-step.component";
import LineCharsStep
    from "../steps/line-chars/line-chars-step.component";
import DeviceCharsStep from "../steps/device-chars/device-chars-step.component";

const StepChainBuilder = new ConditionalStepBuilder<BundleFlowModel>()
    .add(InitBundleStep)
    .add(LineCharsStep, (context) => context.hasLine)
    .add(DeviceCharsStep, (context) => context.hasDevice)
    .add(SubmitSummaryStep);

export default StepChainBuilder;
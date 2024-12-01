import {ConditionalStepBuilder} from "../../../../builders/ConditionalStepBuilder";
import {BundleFlowModel} from "../model/bundle-flow.model";
import InitBundleStep from "../steps/init-bundle/init-bundle-step.component";
import SubmitSummaryStep from "../steps/submit-summary/submit-summary-step.component";
import LineFutureDateActivationStep
    from "../steps/line-future-date-activation/line-future-date-activation-step.component";
import DeviceDeliveryStep from "../steps/device-delivery/device-delivery-step.component";

const StepChainBuilder = new ConditionalStepBuilder<BundleFlowModel>()
    .add(InitBundleStep)
    .add(LineFutureDateActivationStep, (context) => context.hasLine)
    .add(DeviceDeliveryStep, (context) => context.hasDevice)
    .add(SubmitSummaryStep);

export default StepChainBuilder;
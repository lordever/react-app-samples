import {ConditionalStepBuilder} from "../../../../builders/ConditionalStepBuilder";
import {ProductFlowModel} from "../model/product-flow.model";
import Step1 from "../steps/step1.component";
import Step2 from "../steps/step2.component";
import Step3 from "../steps/step3.component";

const StepChainBuilder = new ConditionalStepBuilder<ProductFlowModel>()
    .add(Step1)
    .add(Step2)
    .add(Step3);

export default StepChainBuilder;
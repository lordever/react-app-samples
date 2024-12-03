import React, {FC, useCallback, useMemo, useState} from 'react';
import {StepHandlerProps, StepPosition} from "../../../../../builders/ConditionalStepBuilder";
import {BundleFlowModel} from "../../model/bundle-flow.model";
import WizardToolbar from "../../../../wizard-drawer/wizard-toolbar.component";
import "../../../../wizard-drawer/wizard-drawer.component.css"
import {Characteristic} from "../../../../../model/product.model";
import {List, ListItem, ListItemText} from "@mui/material";
import LineCharacteristicInput from "../../components/line-characteristic-input/line-characteristic-input.component";
import {useSelector} from "react-redux";
import {
    selectBundleFlowQuote,
    selectBundleFlowQuoteCreateLoading
} from "../../../../../store/bundle-flow/bundle-flow.selector";
import {PHONE_NUMBER_CHARACTERISTIC} from "../../../../../common/constants";
import {updateCharacteristicsOnQuote} from "../../../../../store/bundle-flow/bundle-flow.thunk";
import {useAppDispatch} from "../../../../../hooks/store.hook";
import {isSomeCharEmpty} from "./line-chars-step.util";

const LineCharsStep: FC<StepHandlerProps<BundleFlowModel>> = ({onClose, onStepChange}) => {
    const quote = useSelector(selectBundleFlowQuote);
    const dispatch = useAppDispatch()
    const quotesLoading = useSelector(selectBundleFlowQuoteCreateLoading);

    const [quoteItemChar, setQuoteItemChar] = useState<{
        quoteItemId: number,
        char: { charId: number, value: string }
    }>();

    const lineCharacteristicsMap = useMemo(() => (
        quote?.quoteItems?.reduce((map: Record<number, Characteristic[]>, quoteItem) => {
            if (quoteItem.id) {
                map[quoteItem.id] = quoteItem.characteristic.filter(char => char.name === PHONE_NUMBER_CHARACTERISTIC);
            }
            return map;
        }, {})
    ), [quote]);

    const handleNext = useCallback(() => {
        if (isSomeCharEmpty(quoteItemChar)) {
            return;
        }

        const quoteItemId = quoteItemChar?.quoteItemId!;
        const char: Characteristic = {
            id: quoteItemChar?.char?.charId,
            name: PHONE_NUMBER_CHARACTERISTIC,
            value: quoteItemChar?.char.value!
        };

        dispatch(updateCharacteristicsOnQuote({quoteItemId, characteristics: [char]}))
            .unwrap()
            .then(() => {
                onStepChange(StepPosition.NEXT);
            })
    }, [dispatch, quoteItemChar, onStepChange]);

    const handleBack = useCallback(() => {
        onStepChange(StepPosition.BACK)
    }, [onStepChange]);

    const handlePhoneNumberChange = useCallback((quoteItemId?: number, charId?: number, value?: string) => {
        if (quoteItemId && charId && value) {
            setQuoteItemChar({quoteItemId, char: {charId, value}})
        }
    }, [])

    if (!quote) {
        return null;
    }

    return (
        <>
            <List className="characteristics-list">
                {lineCharacteristicsMap &&
                    Object.entries(lineCharacteristicsMap).map(([quoteItemId, characteristics]) => (
                        <div key={quoteItemId}>
                            {characteristics.map((characteristic: Characteristic) => (
                                <ListItem key={characteristic.id} className="characteristics-item">
                                    <ListItemText
                                        primary={characteristic.name}
                                    />
                                    <LineCharacteristicInput
                                        defaultValue={characteristic.value}
                                        onChange={(newValue) => handlePhoneNumberChange(+quoteItemId, characteristic.id, newValue)}
                                    />
                                </ListItem>
                            ))}
                        </div>
                    ))}
            </List>

            <WizardToolbar
                isLoading={quotesLoading}
                onClose={onClose}
                onNext={handleNext}
                onBack={handleBack}
            />
        </>
    );
};

export default LineCharsStep;
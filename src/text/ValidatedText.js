import React, { useMemo } from "react";

import WarningText from './WarningText';

import './ValidatedText.css';

const ValidatedTextDisplay = ({ children, text, field, validator, ...rest }) => {
    const isValid = useMemo(() => validator.checkIsFieldValid(field, text), [field, text, validator]);
    const notValidTooltip = useMemo(() => validator.getNotValidTooltip(field, text), [field, text, validator]);

    if (isValid) return children;

    return <WarningText
        className={'validated-text'}
        title={notValidTooltip}

        {...rest}
    >
        {children || text}
    </WarningText>
}

const ValidatedText = ({ children, text, field, validator, noValidation, ...rest }) => {
    if (!field || !validator || noValidation) return children;

    if (text === undefined || text === null || typeof text === 'function' || typeof text === 'object') return children;

    return <ValidatedTextDisplay
        text={text}
        field={field}
        children={children}
        validator={validator}

        {...rest}
    />
}

ValidatedText.defaultProps = {
    noValidation: false,
    validator: {},
}

export default React.memo(ValidatedText)
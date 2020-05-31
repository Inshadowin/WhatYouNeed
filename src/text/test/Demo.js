import React from 'react';

import SmartText from '../SmartText';
import WarningText from '../WarningText';
import ValidatedText from '../ValidatedText';

const Demo = ({ }) => {
    return <React.Fragment>
        <div style={{ width: 100, marginTop: 150, marginLeft: 150 }}>
            <SmartText>text full</SmartText>
        </div>
        <div style={{ width: 100, marginTop: 50, marginLeft: 150 }}>
            <SmartText>text overldalsdasdaak pdaspdo apsod </SmartText>
        </div>
        {/* <WarningText>text2</WarningText>
        <ValidatedText>text3</ValidatedText> */}
    </React.Fragment>
}

export default Demo;
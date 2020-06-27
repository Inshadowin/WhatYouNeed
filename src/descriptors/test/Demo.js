import React, { useMemo } from 'react';
import getDate from '../wynDate';

const Demo = ({ getDateFunc, dateStr }) => {
    const date = useMemo(() => getDateFunc(dateStr), [dateStr]);

    return <div>
        <div>{date.formatUserDate()}</div>
        <div>{date.formatUserTime()}</div>
        <div>{date.formatUserDateTime()}</div>
        <div>{date.formatUserDateTimeFull()}</div>
    </div>
}

Demo.defaultProps = {
    getDateFunc: getDate,
    dateStr: "2020.06.27T20:50:01.01"
}

export default Demo;
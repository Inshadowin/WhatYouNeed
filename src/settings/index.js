import React from "react";
import { Checkbox } from "antd";

export default Object.freeze({
    defaultTableHeight: 'calc(100vh - 253px)',
    defaultBigTableHeight: 'calc(100vh - 208px)',
    booleanSelectOptions: [{ value: 'true', label: '✔' }, { value: 'false', label: '✘' }],

    booleanViewTrue: <Checkbox checked />,
    booleanViewFalse: <Checkbox checked={false} disabled />,

    tooltipParams: {
        overlayClassName: 'wyn-tooltip',

        trigger: "hover",
        placement: "topLeft",
        mouseEnterDelay: 0.5,
    },

    dateFormats: {
        serverFormat: 'YYYY.MM.DDTHH:mm:ss.SS',

        filterDateTimeFormat: 'YYYY.MM.DDTHH:mm:ss.SS',
        filterDateFormat: 'YYYY.MM.DD',
        filterTimeFormat: 'HH:mm:ss.SS',

        viewDateTimeFormatFull: 'DD-MM-YYYY HH:mm:ss.SS',
        viewDateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
        viewDateFormat: 'DD-MM-YYYY',
        viewTimeFormat: 'HH:mm:ss'
    },
})
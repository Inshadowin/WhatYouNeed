import scrollIntoView from 'scroll-into-view';

export const rescrolAntdTable = (tableClass, { left = 0, top = 0, time = 0, ...rest } = {}) => {
    const queryPrefix = tableClass && `.${tableClass} ` || '';
    scrollIntoView(document.querySelector(`${queryPrefix}.ant-table-fixed-left .ant-table-row`), {
        align: {
            top: top || 0
        },
        time: time
    });
    scrollIntoView(document.querySelector(`${queryPrefix}.ant-table-fixed-right .ant-table-row`), {
        align: {
            top: top || 0
        },
        time: time
    });
    scrollIntoView(document.querySelector(`${queryPrefix}.ant-table-body .ant-table-row`), {
        align: {
            left: left || 0
        },
        time: time
    });
}
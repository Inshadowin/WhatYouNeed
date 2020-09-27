import React, { useCallback, useMemo } from 'react';
import EnchantedTable from '../../dataDisplay/tables/EnchantedTable';

const columns = [
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name'
    },
    {
        title: 'Second'
    },
    {
        title: 'THE THIRD'
    },
    {
        title: 'Some action'
    }
];

const TemplatesViewList = React.memo(({ dataSource, defaultColumns, columns, ...rest }) => {
    const thisColumns = useMemo(() => [...defaultColumns ?? [], ...columns ?? []]);
    const rowKey = useCallback(item => item.name, []);

    return <EnchantedTable
        rowKey={rowKey}
        columns={thisColumns}
        dataSource={dataSource}

        {...rest}
    />
})

TemplatesViewList.defaultProps = {
    defaultColumns: columns
}

export default TemplatesViewList;
import React, { useState } from 'react';
import TemplatesLoader from './TemplatesLoader';
import TemplatesViewList from './TemplatesViewList';

const TemplateMain = React.memo(({ defaultDataSource, loaderProps, ...rest }) => {
    const [dataSource, setDataSouruce] = useState(defaultDataSource ?? []);

    return <React.Fragment>
        <TemplatesLoader onLoad={setDataSouruce} {...loaderProps} />
        <TemplatesViewList dataSource={dataSource} {...rest} />
    </React.Fragment>
})

export default TemplateMain;
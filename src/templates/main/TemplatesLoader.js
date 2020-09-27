import React, { useEffect } from 'react';

const loadTemplates = async (data) => {
    return [
        {
            name: 'template 1',
            info: {}
        },
        {
            name: 'template 2',
            info: {}
        },
        {
            name: 'template 3',
            info: {}
        }
    ]
}

const TemplatesLoader = React.memo(({ onLoad, data, ...rest }) => {
    useEffect(() => {
        const func = async () => {
            const res = await loadTemplates(data);
            onLoad(res);
        }

        func();
    })

    return null;
})

export default TemplatesLoader;
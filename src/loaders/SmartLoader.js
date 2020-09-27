import React, { useCallback } from 'react';
import StupidLoader from './StupidLoader';

const SmartLoader = React.memo(({ ...rest }) => {
    const [fetchId, setFetchId] = useState(1);
    const onLoadRequestStarted = useCallback(() => setFetchId(fetchId => fetchId + 1))

    return <StupidLoader key={fetchId} {...rest} fetchId={fetchId} onLoadRequestStarted={onLoadRequestStarted} />

})

export default SmartLoader;
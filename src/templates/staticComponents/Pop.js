import React from 'react';
import { Popover, Button } from 'antd';

const Pop = () => {
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    return <Popover content={content} title="Title">
        <Button type="primary">Hover me</Button>
    </Popover>
}

export default Pop;
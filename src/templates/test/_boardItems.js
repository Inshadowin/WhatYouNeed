import React from 'react';
import { Popover, Button } from 'antd';
import { Upload, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? 'Loading' : '+'}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}

const Acticle = () => {
    return 'ARTICLE'
}

const Switch = () => {
    return 'Switch'
}

const Picture = () => {
    return 'Picture'
}

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

export default () => {
    return [
        { x: 0, y: 0, w: 1, h: 2, Component: Acticle },
        { x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, Component: Switch },
        { x: 4, y: 2, w: 1, h: 2, Component: Picture },
        { x: 4, y: 2, w: 1, h: 2, Component: Pop },
        { x: 4, y: 2, w: 1, h: 2, Component: Avatar },
    ]
}
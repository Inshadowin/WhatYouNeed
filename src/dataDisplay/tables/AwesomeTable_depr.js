import React from "react";
import { Table } from "antd";
import { rescrolAntdTable } from './tableHelpers';

class AwesomeTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.uniqueSelector = generateUniqueSelector('rscore-enchanted-table');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataSource && prevProps.dataSource.length === 0 && this.props.dataSource && this.props.dataSource.length) {
            rescrolAntdTable(this.uniqueSelector);
        }
    }

    getClassName = () => {
        if (!this.props.className) return this.uniqueSelector;

        return [this.props.className, this.uniqueSelector].join(' ');
    }

    render() {
        return <Table {...this.props} className={this.getClassName()} />
    }
}

export default AwesomeTable;
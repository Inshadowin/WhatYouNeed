import React from "react";
import { Table } from "antd";
import { rescrolAntdTable } from './tableHelpers';

const generateUniqueSelector = (() => {
    let globalId = 0;

    const getUniqueSelector = (className = 'not-defined-classname') => {
        globalId++;

        return `${className}_id_${globalId}`
    }

    return getUniqueSelector;
})();

class EnchantedTable extends React.PureComponent {
    constructor(props) {
        super(props)
        this.uniqueSelector = generateUniqueSelector('wyn-enchanted-table');
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

export default EnchantedTable;
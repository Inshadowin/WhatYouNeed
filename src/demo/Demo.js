import React from 'react';
import { Menu, Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import DemoText from '../text/test/Demo';
import DemoTable from '../dataDisplay/test/tables/Demo';
import DemoDescriptors from '../descriptors/test/Demo';

import './Demo.css';

const Home = () => {
    return 'Welcome';
}

const pages = [
    { path: '/', title: 'Home', component: Home },
    { path: '/Text', title: 'Text', component: DemoText },
    { path: '/Table', title: 'Table', component: DemoTable },
    { path: '/Descriptors', title: 'Descriptors', component: DemoDescriptors }
]

const Demo = ({ pages }) => {
    return <Router>
        <Sider
            // collapsible
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
        >
            <Menu theme={'dark'} mode="inline">
                {pages.map((page, index) => <Menu.Item key={index + 1}><Link to={page.path}>{page.title}</Link></Menu.Item>)}
            </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200, height: '100%' }}>
            <Header className="site-layout-background" style={{ padding: 12 }}>Header</Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <Switch>
                    {pages.map((page, index) => <Route key={index} exact path={page.path} component={page.component} />)}
                </Switch>
            </Content>
        </Layout>
    </Router >
}

Demo.defaultProps = {
    pages: pages
}

export default Demo;
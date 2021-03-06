import './EventsLayout.less';

import * as React from 'react';

import { Redirect, Switch, Route } from 'react-router-dom';
import utils from '../../utils/utils';
import DocumentTitle from 'react-document-title';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Layout } from 'antd';
import ProtectedRoute from '../../components/Router/ProtectedRoute';
import EventSiderMenu from '../../components/EventSiderMenu';
import { eventsRouter } from '../Router/router.config';
import NotFoundRoute from '../Router/NotFoundRoute';

const { Content } = Layout;

class EventsLayout extends React.Component<any> {

    state = {
        collapsed: false,
    };
    

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    
    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };
    
    render() {
        const {
          history,
          location: { pathname },
        } = this.props;
    
        const { path } = this.props.match;
        const { collapsed } = this.state;
    
        const layout = (
          <Layout style={{ background: '#fff', minHeight: '100vh' }}>
            <EventSiderMenu path={path} onCollapse={this.onCollapse} history={history} collapsed={collapsed} />
            <Layout>
                <Layout.Header style={{ background: '#fff', minHeight: 52, padding: 0 }}>
                    <Header collapsed={this.state.collapsed} toggle={this.toggle} />
                </Layout.Header>
                <Content style={{ margin: 16 }}>
                    <Switch>
                        {pathname === '/' && <Redirect from="/" to="/events" />}
                            {eventsRouter
                                .filter((item: any) => !item.isLayout)
                                .map((route: any, index: any) => (
                                <Route
                                    exact
                                    key={index}
                                    path={route.path}
                                    render={props => <ProtectedRoute component={route.component} permission={route.permission} />}
                                />
                                ))}
                        {pathname !== '/' && <NotFoundRoute />}
                    </Switch>
                </Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    <Footer />
                </Layout.Footer>
                </Layout>
            </Layout>
        );
        return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
    }
}
       
export default EventsLayout;
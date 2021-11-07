import './index.less';

import * as React from 'react';

import {  Col, Icon, Layout, Menu } from 'antd';
import { L, isGranted } from '../../lib/abpUtility';

//import AbpLogo from '../../images/user.png';
import { eventsRouter } from '../../components/Router/router.config';

const { Sider } = Layout;

export interface IEventsSiderMenuProps {
  path: any;
  collapsed: boolean;
  onCollapse: any;
  history: any;
}

const EventsSiderMenu = (props: IEventsSiderMenuProps) => {
  const { collapsed, history, onCollapse } = props;
  return (
    <Sider style = {{ background: '#fff' }} trigger={null} className={'sidebar'} width={256} collapsible collapsed={collapsed} onCollapse={onCollapse}>
      {collapsed ? (
        <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
          События
        </Col>
      ) : (
        <Col style={{ textAlign: 'center', marginTop: 15, marginBottom: 10 }}>
         Список событий
        </Col>
      )}

      <Menu theme="light" mode="inline">
        {eventsRouter
          .filter((item: any) => !item.isLayout && item.showInMenu)
          .map((route: any, index: number) => {
            if (route.permission && !isGranted(route.permission)) return null;

            return (
              <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
                <Icon type={route.icon} />
                <span>{L(route.title)}</span>
              </Menu.Item>
            );
          })}
      </Menu>
    </Sider>
  );
};

export default EventsSiderMenu;

import * as React from 'react';

import { Button, Card, Col, Dropdown, Menu, Row, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import EventTypeStore from '../../stores/eventTypeStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AppComponentBase from '../../components/AppComponentBase';
import { L } from '../../lib/abpUtility';


export interface IEventTypeProps extends FormComponentProps {
    eventTypeStore: EventTypeStore;
}

export interface IEventTypeState {
    modalVisible: boolean;
    maxResultCount: number;
    skipCount: number;
    roleId: number;
    filter: string;
}

@inject(Stores.EventTypeStore)
@observer
class EventType extends AppComponentBase<IEventTypeProps, IEventTypeState> {
    formRef: any;

    state = {
        modalVisible: false,
        maxResultCount: 10,
        skipCount: 0,
        roleId: 0,
        filter: '',
    };

    async componentDidMount() {
        await this.getAll();
    }
    async getAll() {
        await this.props.eventTypeStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }

    public render() {
        const { eventType } = this.props.eventTypeStore;
        const columns = [
            {title: L("ID"), dataIndex: 'id', key: 'id', width: 150, render: (text: number) => <div>{text}</div> },
            {title: L("Тип мероприятия"), dataIndex: 'typeName', key: 'typeName', width: 150, render: (text: string) => <div>{text}</div> },
            {
                title: L('Actions'),
                width: 150,
                render: (text: string, item: any) => (
                  <div>
                    <Dropdown
                      trigger={['click']}
                      overlay={
                        <Menu>
                          //<Menu.Item >{L('Edit')}</Menu.Item>
                          <Menu.Item >{L('Delete')}</Menu.Item>
                        </Menu>
                      }
                      placement="bottomLeft"
                    >
                      <Button type="primary" icon="setting">
                        {L('Actions')}
                      </Button>
                    </Dropdown>
                  </div>
                ),
              },
            ];
        return (
            <Card>
                <Row>
                <Col
                    xs={{ span: 4, offset: 0 }}
                    sm={{ span: 4, offset: 0 }}
                    md={{ span: 4, offset: 0 }}
                    lg={{ span: 2, offset: 0 }}
                    xl={{ span: 2, offset: 0 }}
                    xxl={{ span: 2, offset: 0 }}
                >
                    <h2>{L('EventType')}</h2>
                </Col>
                <Col
                    xs={{ span: 14, offset: 0 }}
                    sm={{ span: 15, offset: 0 }}
                    md={{ span: 15, offset: 0 }}
                    lg={{ span: 1, offset: 21 }}
                    xl={{ span: 1, offset: 21 }}
                    xxl={{ span: 1, offset: 21 }}
                >
                    <Button type="primary" shape="circle" icon="plus"  />
                </Col>
                </Row>
                <Row>
                <Col sm={{ span: 10, offset: 0 }}>
                    
                </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        md={{ span: 24, offset: 0 }}
                        lg={{ span: 24, offset: 0 }}
                        xl={{ span: 24, offset: 0 }}
                        xxl={{ span: 24, offset: 0 }}
                    >
                        <Table
                        rowKey="id"
                        size={'default'}
                        bordered={true}
                        pagination={{ pageSize: this.state.maxResultCount, total: eventType === undefined ? 0 : eventType.totalCount, defaultCurrent: 1 }}
                        columns={columns}
                        loading={eventType === undefined ? true : false}
                        dataSource={eventType === undefined ? [] : eventType.items}
                        
                        />
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default EventType;
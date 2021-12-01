import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Button, Card, Col, Dropdown, Menu, Row, Modal, Table } from 'antd';

import AppComponentBase from '../../components/AppComponentBase';
import { FormComponentProps } from 'antd/lib/form';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import EventsStore from '../../stores/eventsStore';
import CreateOrUpdatesEvents from './components/createOrUpdatesEvents';




export interface IEventsProps extends FormComponentProps {
    eventsStore: EventsStore;
}

export interface IEventsState {
    modalVisible: boolean;
    maxResultCount: number;
    skipCount: number;
    eventsId: number;
    filter: string;
}

const confirm = Modal.confirm;

@inject(Stores.EventsStore)
@observer
class Events extends AppComponentBase<IEventsProps, IEventsState> {
    formRef: any;

    state = {
      modalVisible: false,
      maxResultCount: 10,
      skipCount: 0,
      eventsId: 0,
      filter: '',
    };
  
    async componentDidMount() {
      await this.getAll();

    }
  
    async getAll() {
      await this.props.eventsStore.getAll({ maxResultCount: this.state.maxResultCount, skipCount: this.state.skipCount, keyword: this.state.filter });
    }
    
    handleTableChange = (pagination: any) => {
      this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };
  
    Modal = () => {
      this.setState({
        modalVisible: !this.state.modalVisible,
      });
    };
  
    async createOrUpdateModalOpen(entityDto: EntityDto) {
      if (entityDto.id === 0) {
        this.props.eventsStore.createEvents();
        await this.props.eventsStore.getAllEventType();
        await this.props.eventsStore.getAllDateWeek();
      } else {
        await this.props.eventsStore.get(entityDto);
        await this.props.eventsStore.getAllEventType();
        await this.props.eventsStore.getAllDateWeek();
      }
  
      this.setState({ eventsId: entityDto.id });
      this.Modal();
  
      if (entityDto.id !== 0) {
        this.formRef.props.form.setFieldsValue({
          ...this.props.eventsStore.eventsModel,
        });
      } else {
        this.formRef.props.form.resetFields();
      }
    }
  
    delete(input: EntityDto) {
      const self = this;
      confirm({
        title: 'Вы действтиельно хотите удалить эту запись?',
        onOk() {
          self.props.eventsStore.delete(input);
        },
        onCancel() {},
      });
    }
  
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields(async (err: any, values: any) => {
        if (err) {
          return;
        } else {
          if (this.state.eventsId === 0) {
            await this.props.eventsStore.create(values);
          } else {
            await this.props.eventsStore.update({ id: this.state.eventsId, ...values });
          }
        }
  
        await this.getAll();
        this.setState({ modalVisible: false });
        form.setFieldsValue({  });
        form.resetFields();
      });
    };
  
    saveFormRef = (formRef: any) => {
      this.formRef = formRef;
    };
  
  
    public render() {
      const { events } = this.props.eventsStore;
      const columns = [
        { title: L('ID'), dataIndex: 'id', key: 'id', width: 50, render: (text: string) => <div>{text}</div> },
        { title: L('Название мероприятия'), dataIndex: 'title', key: 'title', width: 150, render: (text: string) => <div>{text}</div> },
        { title: L('Описание'), dataIndex: 'description', key: 'description', width: 200, render: (text: string) => <div>{text}</div> },
        { title: L('Изображение'), dataIndex: 'picture', key: 'picture', width: 150, render: (text: string) => <div>{text}</div> },
        { title: L('Тип события'), dataIndex: 'typeName', key: 'typeName', width: 100, render: (text: string) => ( <div>{text}</div>
        ),
         },
        {
          title: L('Действия'),
          width: 150,
          render: (text: string, item: any) => (
            <div>
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>{L('Edit')}</Menu.Item>
                    <Menu.Item onClick={() => this.delete({ id: item.id })}>{L('Delete')}</Menu.Item>
                  </Menu>
                }
                placement="bottomLeft"
              >
                <Button type="primary" icon="setting">
                  {L('Действия')}
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
              <h2>{L('Виды мероприятий')}</h2>
            </Col>
            <Col
              xs={{ span: 14, offset: 0 }}
              sm={{ span: 15, offset: 0 }}
              md={{ span: 15, offset: 0 }}
              lg={{ span: 1, offset: 21 }}
              xl={{ span: 1, offset: 21 }}
              xxl={{ span: 1, offset: 21 }}
            >
              <Button type="primary" shape="circle" icon="plus" onClick={() => this.createOrUpdateModalOpen({ id: 0 })} />
            </Col>
          </Row>
          <Row>
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
                pagination={{ pageSize: this.state.maxResultCount, total: events === undefined ? 0 : events.totalCount, defaultCurrent: 1 }}
                columns={columns}
                loading={events === undefined ? true : false}
                dataSource={events === undefined ? [] : events.items}
                onChange={this.handleTableChange}
              />
            </Col>
          </Row>
          <CreateOrUpdatesEvents
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.modalVisible}
            eventType={this.props.eventsStore.allEventType}
            dateWeek= {this.props.eventsStore.allDateWeek}
            onCancel={() =>
              this.setState({
                modalVisible: false,
              })
            }
            modalType={this.state.eventsId === 0 ? 'edit' : 'create'}
            onCreate={this.handleCreate}
          /> 
          
        </Card>
      );
    }
}

export default Events;

/* */
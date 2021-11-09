import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Button, Card, Col, Dropdown,  Menu, Row, Modal, Table } from 'antd';

import AppComponentBase from '../../components/AppComponentBase';
import { FormComponentProps } from 'antd/lib/form';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import EventTypeStore from '../../stores/eventTypeStore';
import Stores from '../../stores/storeIdentifier';



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

const confirm = Modal.confirm;

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
  
    handleTableChange = (pagination: any) => {
      this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll());
    };
  
    Modal = () => {
      this.setState({
        modalVisible: !this.state.modalVisible,
      });
    };
  
  /*  async createOrUpdateModalOpen(entityDto: EntityDto) {
      if (entityDto.id === 0) {
        this.props.eventTypeStore.createRole();
        await this.props.eventTypeStore.getAllPermissions();
      } else {
        await this.props.eventTypeStore.getRoleForEdit(entityDto);
        await this.props.eventTypeStore.getAllPermissions();
      }
  
      this.setState({ roleId: entityDto.id });
      this.Modal();
  
      this.formRef.props.form.setFieldsValue({
        ...this.props.eventTypeStore.roleEdit.role,
        grantedPermissions: this.props.eventTypeStore.roleEdit.grantedPermissionNames,
      });
    }*/
  
    delete(input: EntityDto) {
      const self = this;
      confirm({
        title: 'Do you Want to delete these items?',
        onOk() {
          self.props.eventTypeStore.delete(input);
        },
        onCancel() {},
      });
    }
  
   /* handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields(async (err: any, values: any) => {
        if (err) {
          return;
        } else {
          if (this.state.roleId === 0) {
            await this.props.eventTypeStore.create(values);
          } else {
            await this.props.eventTypeStore.update({ id: this.state.roleId, ...values });
          }
        }
  
        await this.getAll();
        this.setState({ modalVisible: false });
        form.resetFields();
      });
    };*/
  
    saveFormRef = (formRef: any) => {
      this.formRef = formRef;
    };
  
    handleSearch = (value: string) => {
      this.setState({ filter: value }, async () => await this.getAll());
    };
  
    public render() {
      const { eventType } = this.props.eventTypeStore;
      const columns = [
        { title: L('Название мероприятия'), dataIndex: 'typeName', key: 'typeName', width: 150, render: (text: string) => <div>{text}</div> },
        { title: L('ID'), dataIndex: 'id', key: 'id', width: 150, render: (text: string) => <div>{text}</div> },
        {
          title: L('Действия'),
          width: 150,
          render: (text: string, item: any) => (
            <div>
              <Dropdown
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item /*onClick={() => this.createOrUpdateModalOpen({ id: item.id })}*/>{L('Edit')}</Menu.Item>
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
              <Button type="primary" shape="circle" icon="plus" /*onClick={() => this.createOrUpdateModalOpen({ id: 0 })}*/ />
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
                rowKey="iD"
                size={'default'}
                bordered={true}
                pagination={{ pageSize: this.state.maxResultCount, total: eventType === undefined ? 0 : eventType.totalCount, defaultCurrent: 1 }}
                columns={columns}
                loading={eventType === undefined ? true : false}
                dataSource={eventType === undefined ? [] : eventType.items}
                onChange={this.handleTableChange}
              />
            </Col>
          </Row>
  
          
        </Card>
      );
    }
}

export default EventType;

/* 
<Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
<CreateOrUpdateRole
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.modalVisible}
            onCancel={() =>
              this.setState({
                modalVisible: false,
              })
            }
            modalType={this.state.roleId === 0 ? 'edit' : 'create'}
            onOk={this.handleCreate}
            permissions={allPermissions}
            roleStore={this.props.roleStore}
          /> */
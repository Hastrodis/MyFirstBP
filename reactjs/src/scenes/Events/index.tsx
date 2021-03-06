import * as React from 'react';

import { inject, observer } from 'mobx-react';

import { Button, Card, Col, Dropdown, Menu, Row, Modal, Table, Tag } from 'antd';

import AppComponentBase from '../../components/AppComponentBase';
import { FormComponentProps } from 'antd/lib/form';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import EventsStore from '../../stores/eventsStore';
import CreateOrUpdatesEvents from './components/createOrUpdatesEvents';
import DateWeekModel from '../../models/Event/dateWeekModel';
import { GetAllDateWeek } from '../../services/events/dto/getAllDateWeek';




export interface IEventsProps extends FormComponentProps {
    eventsStore: EventsStore;
}

export interface IEventsState {
    modalVisible: boolean;
    maxResultCount: number;
    skipCount: number;
    eventsId: number;
    filter: string;
    test: string;
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
      test: '',
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

      } else {
        await this.props.eventsStore.get(entityDto);
        await this.props.eventsStore.getEventEdit();
        await this.props.eventsStore.getAllEventType();
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
        title: '???? ?????????????????????????? ???????????? ?????????????? ?????? ?????????????',
        onOk() {
          self.props.eventsStore.delete(input);
        },
        onCancel() {},
      });
    }

    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields(async (err: any, values: any) => {
        console.log(values)
        var dateStore = [];
            for (let i = 0; i < values.dateWeek.length; i++) {
              let tranz = {
                id: 0,
                weekName: values.dateWeek[i],
                eventId: 0
              };
              dateStore.push(tranz);
            }
            var tranzitValue = {
              title: values.title,
              description: values.description,
              evTypeID: values.evTypeID,
              eventEnd: values.eventEnd,
              eventStart: values.eventStart,
              picture: values.tranzit,
              dateWeeks: dateStore,
            }
            console.log(tranzitValue);
            
        if (err) {
          return;
        } else {
          if (this.state.eventsId === 0) {
                      
            await this.props.eventsStore.create(tranzitValue);
          } else {
            await this.props.eventsStore.update({ id: this.state.eventsId, ...tranzitValue });
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
      console.log(formRef)
    };   
    
    getTrueTime = (strTime: string) =>{
      var date = new Date();
      date.setTime(Date.parse(strTime));
      var hours = date.getHours();
      var minute = date.getMinutes();
      const timezoneOffset = (new Date()).getTimezoneOffset();
      console.log(timezoneOffset);

      return hours+":"+minute;
    }

    public render() {
      let options: GetAllDateWeek[] = [
        {"weekName": 1, "id": 0, "eventId":0, "normalizedName": "????"},
        {"weekName": 2, "id": 0, "eventId":0, "normalizedName": "????"},
        {"weekName": 3, "id": 0, "eventId":0, "normalizedName": "????"},
        {"weekName": 4, "id": 0, "eventId":0, "normalizedName": "????"},
        {"weekName": 5, "id": 0, "eventId":0, "normalizedName": "????"},
        {"weekName": 6, "id": 0, "eventId":0, "normalizedName": "????"},
        {"weekName": 7, "id": 0, "eventId":0, "normalizedName": "????"},
      ]
      const { events } = this.props.eventsStore;
      const columns = [
        { title: L('ID'), dataIndex: 'id', key: 'id', width: 50, render: (text: string) => <div>{text}</div> },
        { title: L('???????????????? ??????????????????????'), dataIndex: 'title', key: 'title', width: 130, render: (text: string) => <div>{text}</div> },
        { title: L('????????????????'), dataIndex: 'description', key: 'description', width: 180, render: (text: string) => <div>{text}</div> },
        { title: L('??????????????????????'), dataIndex: 'picture', key: 'picture', width: 150, render: (text: string) => <div><img src={text} height={200} width={200} /></div> },
        { title: L('?????? ??????????????'), dataIndex: 'typeName', key: 'typeName', width: 100, render: (text: string) =>  <div>{text}</div>},
        { title: L('?????????? ????????????'), dataIndex: 'eventStart', key: 'eventStart', width: 80, render: (text: string) =>  <div>{this.getTrueTime(text)}</div>},
        { title: L('?????????? ??????????????????'), dataIndex: 'eventEnd', key: 'eventEnd', width: 80, render: (text: string) =>  <div>{this.getTrueTime(text)}</div>},
        { title: L('?????? ????????????'), dataIndex: 'dateWeeks', key: 'dateWeeks', width: 80, render: (text: DateWeekModel[]) =>  <div>{
          text.map(
            date =>
            <Tag>{options[date.weekName-1].normalizedName}</Tag>
            )  
          }</div>},
        {
          title: L('????????????????'),
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
                  {L('????????????????')}
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
              <h2>{L('???????? ??????????????????????')}</h2>
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
            events={this.props.eventsStore.eventEdit}
            eventType={this.props.eventsStore.allEventType}
            dateWeek= {this.props.eventsStore.allDateWeek}
            onCancel={() =>
              this.setState({
                modalVisible: false,
              })
            }
            modalType={this.state.eventsId === 0 ? 0 : this.state.eventsId}
            onCreate={this.handleCreate}
          /> 
          
        </Card>
      );
    }
}

export default Events;
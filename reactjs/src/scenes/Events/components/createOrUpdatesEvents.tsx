import * as React from 'react';

import { Form, Input, Modal, Select, Tabs, TimePicker } from 'antd';


import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { L } from '../../../lib/abpUtility';
import TextArea from 'antd/lib/input/TextArea';
import { GetAllEventTypeOutput } from '../../../services/eventType/dto/getAllEventTypeOutput';
import { GetAllDateWeek } from '../../../services/events/dto/getAllDateWeek';
import moment from 'moment';
//import EventsModel from '../../../models/Event/eventsModel';
//import NormalizeValueDateWeek from '../../../services/events/dto/normalizeValueDateWeek';
//import { values } from 'mobx';
//import { GetDateWeek } from '../../../services/events/dto/getDateWeek';
//import rules from './createOrUpdateEvents.validation';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateEventsProps extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  //events: EventsModel[];
  eventType: GetAllEventTypeOutput[];
  dateWeek: GetAllDateWeek[];
 // normalizedNamle: NormalizeValueDateWeek[];
}

class CreateOrUpdateEvents extends React.Component<ICreateOrUpdateEventsProps> {
  state = {
    confirmDirty: false,
  };

 
  render() {
    //const { normalizedNamle } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
        xxl: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
        xxl: { span: 18 },
      },
    };

    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, onCreate } = this.props;

    let options: GetAllDateWeek[] = [
      {"weekName": 1, "id": 0, "eventId":0, "normalizedName": "ПН"},
      {"weekName": 2, "id": 0, "eventId":0, "normalizedName": "ВТ"},
      {"weekName": 3, "id": 0, "eventId":0, "normalizedName": "СР"},
      {"weekName": 4, "id": 0, "eventId":0, "normalizedName": "ЧТ"},
      {"weekName": 5, "id": 0, "eventId":0, "normalizedName": "ПТ"},
      {"weekName": 6, "id": 0, "eventId":0, "normalizedName": "СБ"},
      {"weekName": 7, "id": 0, "eventId":0, "normalizedName": "ВС"},
    ]
    const format = 'HH:mm';

    return (
      <Modal visible={visible} destroyOnClose cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Мероприятие'}>
        <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
          <TabPane tab={'Мероприятие'} key={'events'}>
            <FormItem label={L('Заголовок')} {...formItemLayout}>
              {getFieldDecorator('title', /*{ rules: rules.name }*/)( <Input/>)}
            </FormItem>
            <FormItem label={L('Описание')} {...formItemLayout}>
              {getFieldDecorator('description', /*{ rules: rules.surname }*/)(<TextArea />)}
            </FormItem>
            <FormItem label={L('Изображение')} {...formItemLayout}>
              {getFieldDecorator('picture', /*{ rules: rules.userName }*/)(<Input />)}
            </FormItem>            
            <FormItem label={L('Тип мероприятия')} {...formItemLayout}>
              {getFieldDecorator('evTypeID', /*{ rules: rules.emailAddress }*/)
              (<Select placeholder="Выберите тип мероприятия" style={{width: '100%'}} > 
                {this.props.eventType.map(typeName => 
                  <Select.Option key = {typeName.id} value = {typeName.id}> {typeName.typeName} </Select.Option> )
                }
              </Select>)
              }
            </FormItem>
            <FormItem label={L('Время начала')} {...formItemLayout}>
              {getFieldDecorator('eventStart', {initialValue : moment('12:00', format)  } /*{ rules: rules.userName }*/)(<TimePicker  />)}
            </FormItem>
            <FormItem label={L('Время окончания')} {...formItemLayout}>
              {getFieldDecorator('eventEnd', /*{ rules: rules.userName }*/)(<TimePicker format = {format}  />)}
            </FormItem>
            <FormItem label={L('Дни недель')}  {...formItemLayout}>
              {getFieldDecorator('dateWeek', {initialValue:this.props.dateWeek|| [], valuePropName: 'option'} /*{ rules: rules.emailAddress }*/)
              (<Select mode="multiple" placeholder="Выберите дни недели"  style={{width: '100%'}} > 
               {options.map(dateWeek => 
                  <Select.Option key = {dateWeek.id} value = {dateWeek.weekName} > {dateWeek.normalizedName} </Select.Option> )
                }
              </Select>
              )}
            </FormItem>
          </TabPane>
           
        </Tabs>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateEventsProps>()(CreateOrUpdateEvents);

 

          
import * as React from 'react';

import { Form, Input, message, Modal, Select, Tabs, TimePicker } from 'antd';


import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { L } from '../../../lib/abpUtility';
import TextArea from 'antd/lib/input/TextArea';
import { GetAllEventTypeOutput } from '../../../services/eventType/dto/getAllEventTypeOutput';
import { GetAllDateWeek } from '../../../services/events/dto/getAllDateWeek';
import { GetAllEventsOutput } from '../../../services/events/dto/getAllEventsOutput';
import rules from './createOrUpdateEvents.validation';
import moment from 'moment';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateEventsProps extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  modalType: number;
  onCreate: () => void;
  events: GetAllEventsOutput[];
  eventType: GetAllEventTypeOutput[];
  dateWeek: GetAllDateWeek[];
 // normalizedNamle: NormalizeValueDateWeek[];
}

class CreateOrUpdateEvents extends React.Component<ICreateOrUpdateEventsProps> {
  state = {
    confirmDirty: false,
  };

  getOneRecord()
  {
    var one = this.props.events.find(index => index.id === this.props.modalType)
    return one
  }
  
  handleFileRead = async (event: any) => {
    const file = event.target.files[0];
    if (file === undefined) {  }
    else{
      if ((file.size/1024)/1024 > 2) {
        message.error('Слишом большой файл');

      }
      else {
        const base64 = await this.convertBase64(file);
        this.props.form.setFieldsValue({tranzit: base64});
      }
    }
  }

  checkTime = () => {
    const startTime = this.props.form.getFieldValue('eventStart')
    const endTime = this.props.form.getFieldValue('eventStart')
    console.log(startTime.hour)
    if (startTime.hour < endTime.hour)
      console.log("ЛУЛ")
  }

  convertBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  render() {
    
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
              {getFieldDecorator('title',  { initialValue: this.getOneRecord()?.title, rules: rules.title } )( <Input/>)}
            </FormItem>
            <FormItem label={L('Описание')} {...formItemLayout}>
              {getFieldDecorator('description', { initialValue: this.getOneRecord()?.description })(<TextArea />)}
            </FormItem>
            <FormItem label={L('Изображение')} {...formItemLayout}>
              {getFieldDecorator('picture')(
              < Input accept='.png, .jpg' type='file' onChange={e => this.handleFileRead(e)} />)}
            </FormItem>            
            <FormItem label={L('Тип мероприятия')} {...formItemLayout}>
              {getFieldDecorator('evTypeID', { initialValue: this.getOneRecord()?.evTypeID, rules: rules.evTypeID })
              (<Select placeholder="Выберите тип мероприятия" style={{width: '100%'}} > 
                {this.props.eventType.map(typeName => 
                  <Select.Option key = {typeName.id} value = {typeName.id}> {typeName.typeName} </Select.Option> )}
              </Select>)
              }
            </FormItem>
            <FormItem label={L('Время начала')} {...formItemLayout}>
              {getFieldDecorator('eventStart', { initialValue: moment(this.getOneRecord()?.eventStart), rules: rules.time } )(<TimePicker format = {format} />)}
            </FormItem>
            <FormItem label={L('Время окончания')} {...formItemLayout}>
              {getFieldDecorator('eventEnd', { initialValue: moment(this.getOneRecord()?.eventEnd), rules: rules.time })(<TimePicker format = {format} />)}
            </FormItem>
            <FormItem label={L('Дни недель')}  {...formItemLayout}>
              {getFieldDecorator('dateWeek',  { initialValue: this.getOneRecord()?.dateWeeks.map(date => date.weekName), rules: rules.dateWeek })
              (<Select mode="multiple" placeholder="Выберите дни недели"  style={{width: '100%'}} > 
               {options.map(dateWeek => 
                  <Select.Option key = {dateWeek.id} value = {dateWeek.weekName} > {dateWeek.normalizedName} </Select.Option> )
                }
              </Select>
              )}
            </FormItem>

            <FormItem style = {{display: 'none'}} label={L('КОСТЫЛЬ')} {...formItemLayout}>
              {getFieldDecorator('tranzit', { initialValue:  this.getOneRecord()?.picture } )( <Input/>)}
            </FormItem>

          </TabPane>
           
        </Tabs>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateEventsProps>()(CreateOrUpdateEvents);

 

          
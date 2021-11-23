import * as React from 'react';

import { Form, Input, Modal, Select, Tabs } from 'antd';

import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { L } from '../../../lib/abpUtility';
import TextArea from 'antd/lib/input/TextArea';
import { GetAllEventTypeOutput } from '../../../services/eventType/dto/getAllEventTypeOutput';
//import { GetDateWeek } from '../../../services/events/dto/getDateWeek';
//import rules from './createOrUpdateEvents.validation';

const TabPane = Tabs.TabPane;

export interface ICreateOrUpdateEventsProps extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  eventType: GetAllEventTypeOutput[];
}

class CreateOrUpdateEvents extends React.Component<ICreateOrUpdateEventsProps> {
  state = {
    confirmDirty: false,
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    //const { dateWeek } = this.props;

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
    const tailFormItemLayout = {
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

    /*const options = dateWeek.map((x: GetDateWeek) => {
      var test = { x.};
      return test;
    });*/
    console.log(this.props.eventType)
    return (
      <Modal visible={visible} cancelText={L('Cancel')} okText={L('OK')} onCancel={onCancel} onOk={onCreate} title={'Мероприятие'}>
        <Tabs defaultActiveKey={'userInfo'} size={'small'} tabBarGutter={64}>
          <TabPane tab={'Мероприятие'} key={'events'}>
            <FormItem label={L('Заголовок')} {...formItemLayout}>
              {getFieldDecorator('title', /*{ rules: rules.name }*/)(<Input />)}
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
          </TabPane>
          <TabPane tab={L('Дни недели')} key={'dayWeek'}>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('weekName', { valuePropName: 'value' })(<CheckboxGroup options={["ПН", "ВТ"]} />)}
            </FormItem>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateEventsProps>()(CreateOrUpdateEvents);

 

          
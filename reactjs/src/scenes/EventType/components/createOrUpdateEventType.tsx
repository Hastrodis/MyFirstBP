import * as React from 'react';

import { Form, Input, Modal } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { L } from '../../../lib/abpUtility';
import rules from './createOrUpdateEvenType.validation';
import { GetAllEventTypeOutput } from '../../../services/eventType/dto/getAllEventTypeOutput';

export interface ICreateOrUpdateEvetTypeProps extends FormComponentProps {
  visible: boolean;
  modalType: number;
  eventTypeEdit: GetAllEventTypeOutput[];
  onCreate: () => void;
  onCancel: () => void;
}

class CreateOrUpdateEventType extends React.Component<ICreateOrUpdateEvetTypeProps> {

  getOneRecord()
  {
    var one = this.props.eventTypeEdit.find(index => index.id === this.props.modalType)
    return one
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
    return (
      <Modal visible={visible} onCancel={onCancel} onOk={onCreate} title={L('Типы мероприятий')} width={550}>
        <Form>
          <FormItem label={L('Мероприятие')} {...formItemLayout}>
            {getFieldDecorator('typeName', { initialValue : this.getOneRecord()?.typeName, rules: rules.typeName })(<Input  />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<ICreateOrUpdateEvetTypeProps>()(CreateOrUpdateEventType);

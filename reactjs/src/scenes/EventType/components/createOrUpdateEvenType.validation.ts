import { L } from '../../../lib/abpUtility';

const rules = {
  id: [{ required: true, message: L('Это поле обязательно к заполнению') }],
  typeName: [{ required: true, message: L('Это поле обязательно к заполнению') }]
};

export default rules;

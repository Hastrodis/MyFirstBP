import { L } from '../../../lib/abpUtility';

const rules = {
  
  title: [{ required: true, message: L('Это поле обязательно к заполнению') }],
  evTypeID: [{ required: true, message: L('Это поле обязательно к заполнению') }],
  time: [{ required: true, message: L('Это поле обязательно к заполнению') }],
  dateWeek : [{ required: true, message: L('Это поле обязательно к заполнению') }],
};



export default rules;

import * as React from 'react';

import { FormComponentProps } from 'antd/lib/form';
import EventTypeStore from '../../stores/eventTypeStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
import AppComponentBase from '../../components/AppComponentBase';
import { Col } from 'antd';


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

    public render() {
        return (
            <Col>test</Col>
        )
    }
}

export default EventType;
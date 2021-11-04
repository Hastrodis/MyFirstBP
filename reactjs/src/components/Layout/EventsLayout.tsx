import './EventsLayout.less';

import * as React from 'react';


import utils from '../../utils/utils';
import { Col } from 'antd';
import LanguageSelect from '../LanguageSelect';
import DocumentTitle from 'react-document-title';

class EventsLayout extends React.Component<any> {
    render() {
        const {
            location: { pathname },
        } = this.props;
    return (
        <DocumentTitle title={utils.getPageTitle(pathname)}>
            <Col className="container">
                <div className={'lang'}>
                    ЪУЪ, ВЫБОР ЯЗЫКА
                    <LanguageSelect />
                </div>
          </Col>
        </DocumentTitle>
    );
    }
}

export default EventsLayout;
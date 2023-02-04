import React from 'react';
import { Col, Row } from 'antd';
import Sidebar from '../components/Sidebar/Sidebar';
import './Layout.scss';
import Tabs from '../components/Tabs/Tabs';

const Layout = ({ children }) => {
    return (
        <div className="container">
            <div className="content">
                <Row style={{ height: '100%' }}>
                    <Col span={6}>
                        <Sidebar />
                    </Col>
                    <Col span={18}>
                        <div className="col-18-content">
                            <Tabs />

                            {children}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Layout;

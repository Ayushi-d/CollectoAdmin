/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Layout } from 'antd';
import { AppName, AppContent } from '../../constants';

const { Footer } = Layout;

class FooterComponent extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        {AppName}
        {' '}
        {AppContent.Footer_Section.copy_right_text}
      </Footer>
    );
  }
}
export default FooterComponent;

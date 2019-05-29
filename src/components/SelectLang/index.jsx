import React, { Component } from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { i18n } from '@src/config/setting';
import styles from './selectlang.module.scss';

const { languages, defaultLanguage } = i18n;
@inject('localeStore')
@observer
class SelectLang extends Component {
  changeLang = ({ key }) => {
    this.props.localeStore.setLocale(key);
  }

  getMenu = () => {
    const { localeStore: { locale } } = this.props;
    const selectedLang = locale || defaultLanguage;

    return (
      <Menu selectedKeys={[selectedLang]}>
        {languages.map(({ key, icon, title }) =>
          <Menu.Item key={key} onClick={this.changeLang}>
            <span style={{
              marginRight: '5px'
            }}
            >
              {icon}
            </span>
            {title}
          </Menu.Item>
        )}
      </Menu>
    )
  };

  render() {
    return (
      <Dropdown overlay={this.getMenu()} placement="bottomRight">
        <div className={styles.langIcon}>
          <Icon type="global" className={styles.icon} />
        </div>
      </Dropdown>
    )
  }
}

export default SelectLang;

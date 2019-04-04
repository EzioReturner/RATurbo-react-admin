import React, { Component } from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import styles from './selectlang.module.scss';

@inject('localeStore')
@observer
class SelectLang extends Component {
  changeLang = ({ key }) => {
    this.props.localeStore.setLocale(key);
  }

  getMenu = () => {
    const locales = ['zh', 'en', 'ja'];
    const { localeStore: { locale } } = this.props;
    const selectedLang = locale;

    const languageLabels = {
      'zh': '简体中文',
      'en': 'English',
      'ja': '日本語',
    };
    const languageIcons = {
      'zh': '🇨🇳',
      'en': '🇬🇧',
      'ja': '🇯🇵',
    };
    return (
      <Menu selectedKeys={[selectedLang]}>
        {locales.map(locale =>
          <Menu.Item key={locale} onClick={this.changeLang}>
            <span style={{
              marginRight: '5px'
            }}>
              {languageIcons[locale]}
            </span>
            {languageLabels[locale]}
          </Menu.Item>
        )}
      </Menu>
    )
  };

  render() {
    return <Dropdown overlay={this.getMenu()} placement="bottomRight">
      <div className={styles.langIcon}>
        <Icon type="global" className={styles.icon} />
      </div>
    </Dropdown>
  }
}

export default SelectLang;

import React from 'react';
import { Dropdown, Icon, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import { i18n } from '@config/setting';
import styles from './selectlang.module.scss';
import LocaleStore from '@store/localeStore';

interface InjectedProps {
  localeStore: LocaleStore;
}

const { languages, defaultLanguage } = i18n;

const SelectLang: React.FC = props => {
  const injected = () => {
    return props as InjectedProps;
  };

  const { localeStore } = injected();

  const changeLang = (data: any) => {
    localeStore.setLocale(data.key);
  };

  const getMenu = () => {
    const { locale } = localeStore;
    const selectedLang = locale || defaultLanguage;
    return (
      <Menu selectedKeys={[selectedLang]}>
        {languages.map(({ key, icon, title }) => (
          <Menu.Item key={key} onClick={changeLang}>
            <span
              style={{
                marginRight: '5px'
              }}
            >
              {icon}
            </span>
            {title}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={getMenu()} placement="bottomRight">
      <div className={styles.langIcon}>
        <Icon type="global" className={styles.icon} />
      </div>
    </Dropdown>
  );
};

export default inject('localeStore')(observer(SelectLang));

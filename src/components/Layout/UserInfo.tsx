import React, { useEffect } from 'react';
import { Menu, Dropdown, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './header.module.scss';
import UserStore from '@store/userStore';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
const confirm = Modal.confirm;

interface InjectedProps extends RouteComponentProps<any> {
  userStore: UserStore;
}

const UserInfo: React.FC<RouteComponentProps> = props => {
  function injected() {
    return props as InjectedProps;
  }
  const {
    userStore: { userInfo, reloadUserInfo, userLogout }
  } = injected();

  const { history } = props;

  useEffect(() => {
    if (JSON.stringify(userInfo) === '{}') {
      reloadUserInfo();
    }
  });

  const handleLogout = () => {
    confirm({
      maskClosable: true,
      title: 'confirm to logout',
      content: 'user info will reset, system cannot auto-login',
      onOk: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            userLogout();
            history.push('/user/login');
            resolve();
          }, 800);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {}
    });
  };

  const handleTriggerError = () => {
    history.push('/exception/home');
  };

  const getMenu = () => (
    <Menu>
      <Menu.Item>
        <UserOutlined />
        <span className={styles.menuItem}>user info</span>
      </Menu.Item>
      <Menu.Item onClick={handleTriggerError}>
        <SettingOutlined />
        <span className={styles.menuItem}>trigger error</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout}>
        <LogoutOutlined />
        <span className={styles.menuItem}>logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.userInfo}>
      <Dropdown overlay={getMenu()} className={styles.userDropdown} placement="bottomRight">
        <div className={styles.userDropdown}>
          <UserOutlined className={styles.userIcon} />
          <span className={styles.text}>{userInfo.name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default inject('userStore')(withRouter(observer(UserInfo)));

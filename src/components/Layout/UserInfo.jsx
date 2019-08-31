import React, { Component } from 'react';
import { Icon, Menu, Dropdown, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styles from './header.module.scss';

const confirm = Modal.confirm;

@withRouter
@inject('userStore')
@observer
class UserInfo extends Component {
  componentDidMount() {
    const { userInfo, reloadUserInfo } = this.props.userStore;
    if (JSON.stringify(userInfo) === '{}') {
      reloadUserInfo();
    }
  }

  handleLogout = () => {
    confirm({
      maskClosable: true,
      title: 'confirm to logout',
      content: 'user info will reset, system cannot auto-login',
      onOk: () => {
        return new Promise(resolve => {
          const { history, userStore } = this.props;
          setTimeout(() => {
            userStore.userLogout();
            history.push('/user/login');
            resolve();
          }, 800);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {}
    });
  };

  handleTriggerError = () => {
    this.props.history.push('/exception/home');
  };

  getMenu = () => (
    <Menu>
      <Menu.Item>
        <Icon type="user" />
        <span className={styles.menuItem}>user info</span>
      </Menu.Item>
      <Menu.Item onClick={this.handleTriggerError}>
        <Icon type="setting" />
        <span className={styles.menuItem}>trigger error</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={this.handleLogout}>
        <Icon type="logout" />
        <span className={styles.menuItem}>logout</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    const { name } = this.props.userStore.userInfo;

    return (
      <div className={styles.userInfo}>
        <Dropdown overlay={this.getMenu()} className={styles.userDropdown} placement="bottomRight">
          <div className={styles.userDropdown}>
            <Icon type="user" className={styles.userIcon} />
            <span className={styles.text}>{name}</span>
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default UserInfo;

import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';
import { Breadcrumb } from '@models/index';
import LayoutStore from '@store/layoutStore';
import LocaleStore from '@store/localeStore';

interface InjectedProps extends RouteComponentProps<any> {
  layoutStore: LayoutStore;
  localeStore: LocaleStore;
}

@inject('layoutStore', 'localeStore')
@observer
class BreadCrumb extends React.Component<RouteComponentProps> {
  get injected() {
    return this.props as InjectedProps;
  }

  componentDidMount() {
    const { layoutStore } = this.injected;
    const {
      location: { pathname }
    } = this.props;
    layoutStore.addBreadcrumb(pathname);
  }

  handleDelBreadcrumb(e: React.MouseEvent<HTMLElement>, name: string) {
    e.stopPropagation();
    const {
      history,
      location: { pathname }
    } = this.props;

    const {
      layoutStore: { delBreadcrumb }
    } = this.injected;

    const delSelf = delBreadcrumb(name, pathname);
    if (delSelf) {
      history.push(delSelf.path);
    }
  }

  handleGoBreadPath(path: string) {
    const {
      history,
      location: { pathname }
    } = this.props;
    if (pathname === path) {
      return;
    }
    history.push(path);
  }

  checkDisplay(path: string) {
    const {
      location: { pathname }
    } = this.props;
    return path === pathname;
  }

  render() {
    const {
      layoutStore: { breadcrumbList },
      localeStore: { localeObj }
    } = this.injected;
    return (
      <div className={styles.breadcrumbList}>
        {breadcrumbList.map((bread: Breadcrumb, index: number) => {
          const { display, path, name } = bread;
          const key = path
            .split('/')
            .slice(1)
            .join('.');

          return display ? (
            <div
              key={index}
              className={classNames(
                styles.breadcrumb,
                this.checkDisplay(path) ? styles.display : ''
              )}
              onClick={() => this.handleGoBreadPath(path)}
            >
              {localeObj[`menu.${key}`] || name}
              <Icon
                type="close"
                className={styles.closeIcon}
                onClick={e => this.handleDelBreadcrumb(e, name)}
              />
            </div>
          ) : null;
        })}
      </div>
    );
  }
}

export default withRouter(BreadCrumb);

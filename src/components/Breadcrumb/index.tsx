import React, { useEffect } from 'react';
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

const BreadCrumb: React.FC<RouteComponentProps> = props => {
  const injected = () => {
    return props as InjectedProps;
  };

  const {
    layoutStore: { breadcrumbList, delBreadcrumb },
    localeStore: { localeObj }
  } = injected();

  const {
    history,
    location: { pathname }
  } = props;

  useEffect(() => {
    const { layoutStore } = injected();
    layoutStore.addBreadcrumb(pathname);
  }, []);

  function handleDelBreadcrumb(e: React.MouseEvent<HTMLElement>, name: string) {
    e.stopPropagation();
    const delSelf = delBreadcrumb(name, pathname);
    if (delSelf) {
      history.push(delSelf.path);
    }
  }

  function handleGoBreadPath(path: string) {
    if (pathname === path) {
      return;
    }
    history.push(path);
  }

  function checkDisplay(path: string) {
    return path === pathname;
  }

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
            className={classNames(styles.breadcrumb, checkDisplay(path) ? styles.display : '')}
            onClick={() => handleGoBreadPath(path)}
          >
            {localeObj[`menu.${key}`] || name}
            <Icon
              type="close"
              className={styles.closeIcon}
              onClick={e => handleDelBreadcrumb(e, name)}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default inject('layoutStore', 'localeStore')(withRouter(observer(BreadCrumb)));

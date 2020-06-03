import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { useLocation, useHistory } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import LayoutStore from '@store/layoutStore';
import LocaleStore from '@store/localeStore';
import './breadcrumb.less';

interface InjectedProps {
  layoutStore: LayoutStore;
  localeStore: LocaleStore;
}

const BreadCrumb: React.FC = props => {
  let history = useHistory();
  let location = useLocation();

  const { pathname } = location;

  const {
    layoutStore: { breadcrumbList, delBreadcrumb, addBreadcrumb },
    localeStore: { localeObj }
  } = props as InjectedProps;

  useEffect(() => {
    addBreadcrumb(pathname);
  }, [pathname, addBreadcrumb]);

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
    <div className="RA-breadcrumbList">
      {breadcrumbList.map((bread: Breadcrumb, index: number) => {
        const { display, path, name } = bread;
        const key = path
          .split('/')
          .slice(1)
          .join('.');

        return display ? (
          <div
            key={index}
            className={classNames('RA-breadcrumb', checkDisplay(path) && 'RA-breadcrumb-display')}
            onClick={() => handleGoBreadPath(path)}
          >
            {localeObj[`menu.${key}`] || name}
            <CloseOutlined
              className="RA-breadcrumb-closeIcon"
              onClick={e => handleDelBreadcrumb(e, name)}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default inject('layoutStore', 'localeStore')(observer(BreadCrumb));

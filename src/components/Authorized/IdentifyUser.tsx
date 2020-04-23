import React, { useEffect } from 'react';
import Loading from '@components/Loading';
import { observer, inject } from 'mobx-react';
import UserStore from '@store/userStore';
import { useHistory } from 'react-router-dom';
interface IdentifyUserProps {
  userStore: UserStore;
}

const IdentifyUser: React.FC = props => {
  const history = useHistory();

  const {
    userStore: { identifyStatus, getAuthority, setAuthority }
  } = props as IdentifyUserProps;

  useEffect(() => {
    const au = getAuthority();
    setAuthority(au);
  }, [getAuthority, setAuthority]);

  useEffect(() => {
    if (identifyStatus === 'identifying') {
      return;
    }
    if (identifyStatus === 'identifyPass') {
      history.push('/');
    } else if (identifyStatus === 'unauthorized') {
      history.push('/user/login');
    }
  }, [history, identifyStatus]);

  return (
    <section>
      <Loading spinning style={{ background: '#fff' }} text="identifying" />
    </section>
  );
};

export default inject('userStore')(observer(IdentifyUser));

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
    userStore: { identifyPass, getAuthority, setAuthority }
  } = props as IdentifyUserProps;

  useEffect(() => {
    const au = getAuthority();
    setAuthority(au);
  }, []);

  useEffect(() => {
    if (identifyPass === 'identifying') {
      return;
    }
    if (identifyPass) {
      history.push('/');
    } else {
      history.push('/user/login');
    }
  }, [identifyPass]);

  return (
    <section>
      <Loading spinning style={{ background: '#fff' }} text="identifying" />
    </section>
  );
};

export default inject('userStore')(observer(IdentifyUser));

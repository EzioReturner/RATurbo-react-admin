import { RouteComponentProps } from 'react-router-dom';

declare module 'react-router-dom' {
  export function withRouter<T extends RouteComponentProps<any>>(
    component?: React.ComponentType<T>
  ): any;
}

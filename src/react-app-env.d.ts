/* eslint-disable */
/// <reference types="react-scripts" />

declare module 'react-redux-promise-listener' {
  interface IProps {
    children: (asyncFunction: any) => void;
    listener: object;
    start: string;
    resolve: string;
    reject: string;
    setPayload?: () => void;
    getPayload?: () => void;
    getError?: () => void;
  }

  export default class MakeAsyncFunction extends React.Component<IProps> {}
}

import { AxiosRequestConfig } from 'axios';

export interface StoreKeyValue {
  [name: string]: StoreValue;
}

export declare type StoreValue = any;

export interface IoOptions extends AxiosRequestConfig {
  returnConfig?: boolean; // 是否返回req配置项
  options?: AxiosRequestConfig;
}

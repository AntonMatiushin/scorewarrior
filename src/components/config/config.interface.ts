export interface GetConfigQueryParams {
  appVersion: string;
  platform: AppPlatform;
}

export enum AppPlatform {
  IOS = 'ios',
  ANDROID = 'android',
}

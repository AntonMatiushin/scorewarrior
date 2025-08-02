import { Router } from 'express';
import { AppPlatform } from '@src/components/config/config.interface';

export interface BaseApi {
  getRouter(): Router;
}

export type ILogger = typeof console;

export type EmptyObject = Record<string, never>;

export interface Versionable {
  version: string;
}

export interface Platformable {
  platform: AppPlatform;
}

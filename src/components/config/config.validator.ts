import Joi from 'joi';
import { AppPlatform } from '@src/components/config/config.interface';
import { valid } from 'semver';

export const getConfigSchema = Joi.object({
  appVersion: Joi.custom((value: string, helpers) => {
    return valid(value) ? value : helpers.error('any.invalid');
  }).required(),
  platform: Joi.string()
    .valid(...Object.values(AppPlatform))
    .required(),
});

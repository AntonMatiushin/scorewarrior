import '../../helpers/tests/tests.preparator';
import '../../helpers/tests/mocks';
import request from 'supertest';
import { container } from '@src/ioc/container';
import { TYPES } from '@src/ioc/types';
import { Application } from '@src/app';
import { AppPlatform } from '@src/components/config/config.interface';

describe('config.api', () => {
  const app = container.get<Application>(TYPES.Application);

  beforeAll(() => {
    return app.start();
  });

  afterAll(() => {
    return app.stop();
  });

  describe('GET /', () => {
    const url = '/config';
    const appVersion = '13.3.481';
    const platform = AppPlatform.ANDROID;

    test('success', async () => {
      const response = await request(app.express).get(
        `${url}?appVersion=${appVersion}&platform=${platform}`,
      );
      expect(response.status).toBe(200);
    });

    test('no query param', async () => {
      const response = await request(app.express).get(url);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'error.message',
        '"appVersion" is required',
      );
    });
  });
});

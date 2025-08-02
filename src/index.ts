import 'reflect-metadata';

import { container } from '@src/ioc/container';
import { Application } from '@src/app';
import { TYPES } from '@src/ioc/types';

const app = container.get<Application>(TYPES.Application);

app.start();

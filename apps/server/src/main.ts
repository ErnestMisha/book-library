import { config } from './config';
import CreateServer from 'fastify';
import { app } from './app/app';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

const server = CreateServer({
  logger: {
    level: config.logLevel,
  },
})
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .register(app)
  .listen({ port: config.appPort });

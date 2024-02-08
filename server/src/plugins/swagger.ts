import fp from 'fastify-plugin';
import { fastifySwagger, FastifySwaggerOptions } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { config } from '../config';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export default fp<FastifySwaggerOptions>(async (fastify) => {
  if (config.environment === 'development') {
    fastify.register(fastifySwagger, {
      swagger: {
        info: { title: 'book-library rest api', version: '0.0.0' }
      },
      transform: jsonSchemaTransform
    });
    fastify.register(fastifySwaggerUi);
  }
});

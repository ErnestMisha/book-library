import fp from 'fastify-plugin';
import { fastifyMultipart, FastifyMultipartOptions } from '@fastify/multipart';
import { config } from '../../config';

export default fp<FastifyMultipartOptions>(async (fastify) => {
  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: config.fileSizeLimitKb * 1024,
    },
  });
});

import { config } from './config';
import CreateServer from 'fastify';
import closeWithGrace from 'close-with-grace';
import { app } from './app/app';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

const server = CreateServer({
  logger: {
    level: config.logLevel,
  },
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const closeListeners = closeWithGrace(
  { delay: config.forceShutdownDelay },
  async function ({ signal, err, manual }) {
    if (err) {
      server.log.error(err);
    }
    await server.close();
  } as closeWithGrace.CloseWithGraceAsyncCallback
);

server.addHook('onClose', async (instance) => {
  closeListeners.uninstall();
});
server.register(app);
server.listen({ port: config.appPort }, (err: Error | null, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

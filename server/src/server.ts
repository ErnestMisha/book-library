import { config } from './config';
import CreateServer from 'fastify';
import closeWithGrace from 'close-with-grace';
import { app } from './app';

const server = CreateServer({
  logger: {
    level: config.logLevel
  }
});

const closeListeners = closeWithGrace({ delay: config.forceShutdownDelay }, async function ({
  signal,
  err,
  manual
}) {
  if (err) {
    server.log.error(err);
  }
  await server.close();
} as closeWithGrace.CloseWithGraceAsyncCallback);

server.addHook('onClose', async (instance) => 
{
  closeListeners.uninstall();
});
server.register(app);
server.listen({ port: config.appPort }, (err: Error | null, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

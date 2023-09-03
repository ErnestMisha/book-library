import { fastifyPlugin } from "fastify-plugin";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { config } from "../config.js";

export default fastifyPlugin(async function (fastify, opts) {
  if (config.environment === "development") {
    fastify.register(fastifySwagger, {
      swagger: {
        info: { title: "Book library REST API app" },
      },
    });
    fastify.register(fastifySwaggerUi);
  }
});

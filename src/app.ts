import fastify from "fastify";
import { fastifyErrorHandler } from "./libs/fastify-error-handler";

const app = fastify();

app.setErrorHandler(fastifyErrorHandler);

export { app };

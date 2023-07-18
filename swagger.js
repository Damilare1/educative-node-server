import swaggerAutogen from "swagger-autogen";
import { apiUrl } from "./config/config.js"
const outputFile = "./api-doc.json";
const endpointsFiles = ["./app.js"];
const doc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "Survey Node API",
    version: "1.0.0",
  },
  schemes: ["http", "https"],
  host: apiUrl
};

swaggerAutogen(outputFile, endpointsFiles, doc);

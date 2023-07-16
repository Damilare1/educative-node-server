import swaggerAutogen from "swagger-autogen";

const outputFile = "./api-doc.js";
const endpointsFiles = ["./app.js"];
const doc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "Survey Node API",
    version: "1.0.0",
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);

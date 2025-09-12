const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts & Temples API',
    description: 'API for managing contacts and temples for CSE341.',
    version: '1.0.0',
  },
  host: 'cse341-node-ob82.onrender.com',
  schemes: ['https'],
  basePath: '/',
  tags: [
    {
      name: 'Contacts',
      description: 'Endpoints related to contacts',
    },
    {
      name: 'Temples',
      description: 'Endpoints related to temples',
    },
  ],
};

const outputFile = './swagger-output.json'; // This gets imported in server.js
const endpointsFiles = [
  './routes/contactRoutes.js',
  './routes/templeRoutes.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);

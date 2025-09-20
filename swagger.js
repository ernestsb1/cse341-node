const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts, Temples & Books API',
    description: 'API for managing contacts, temples, and books for CSE341.',
    version: '1.0.0',
  },
  host: 'cse341-node-ob82.onrender.com/api-docs',
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
     {
      name: 'Books',
      description: 'Endpoints related to books', 
    },
  ],
};

const outputFile = './swagger-output.json'; // This gets imported in server.js
const endpointsFiles = [
  './routes/contactRoutes.js',
  './routes/templeRoutes.js',
  './routes/bookRoutes.js',

];

swaggerAutogen(outputFile, endpointsFiles, doc);

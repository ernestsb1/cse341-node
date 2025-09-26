// swagger.js (or swagger-gen.js depending on your naming)
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts, Temples & Books API',
    description: 'API for managing contacts, temples, and books.\n\n' +
      '🔒 **Authentication required** for creating, updating, and deleting records.\n' +
      '✅ OAuth via GitHub is used for login.\n' +
      '🔗 Login at `/auth/github`, logout at `/auth/logout`.',
    version: '1.0.0',
  },
  host: 'cse341-node-ob82.onrender.com', 
  schemes: ['https'], // use http if testing locally
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
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
      description: 'Session-based authentication using cookie from GitHub OAuth login.',
    },
  },
};

const outputFile = './swagger-output.json'; // Will be used by server.js
const endpointsFiles = [
  './routes/contactRoutes.js',
  './routes/templeRoutes.js',
  './routes/bookRoutes.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);

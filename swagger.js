const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'contacts API',
    description: 'API for managing contacts',
  },
  host: 'cse341-node-ob82.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contactRoutes.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });


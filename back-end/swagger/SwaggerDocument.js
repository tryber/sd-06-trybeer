// swagger definition
const definition = {
  openapi: '3.0.1',
  info: {
      version: '1.0.0',
      title: 'API - Trybeer',
      description: 'Documentation Api Trybeer',
      termsOfService: '',
      contact: {
          name: 'Ricardo Ribeiro',
          email: 'ricardoribeiro.dev@gmail.com',
          url: 'https://www.betrybe.com/',
      },
      license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
      host: 'http://localhost:3001',
      basePath: '/',
  },
};

const options = {
  definition,
  apis: ['./controller/*.js'],
};

module.exports = { options };

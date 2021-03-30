const frisby = require('frisby');
const Utils = require('../service/utils/index');
const validations = require('../service/validations/index');
require('dotenv/config');
const {
  createAndInsertsDataBase,
  dropAndTruncateDataBase,
} = require('./helpers');

const BAD_REQUEST = 400;
const SUCCESS = 200;
const apiUrl = 'http://localhost:3001';
const loginEndpoint = '/users/login';
const productsEndpoint = '/products';
const salesEndpoint = '/sales';

const defaultUser = {
  email: 'tryber@trybe.com.br',
  password: '123456',
  userId: 1,
};

describe('Testing login endpoint', () => {
  beforeEach(async () => {
    await createAndInsertsDataBase();
  });

  afterEach(async () => {
    await dropAndTruncateDataBase();
  });

  afterAll(async () => {
    await createAndInsertsDataBase();
  });

  it('Should not be able to login without e-mail', async () => {
    await frisby
        .post(`${ apiUrl }${ loginEndpoint }`,
        {
          password: defaultUser.password,
        })
      .expect('status', BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Should not be able to login without password', async () => {
    await frisby
      .post(`${ apiUrl }${ loginEndpoint }`,
        { 
          email: defaultUser.email,
        })
      .expect('status', BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  });

  it('Should receive a token if login succeed', async () => {
    await frisby
      .post(`${ apiUrl }${ loginEndpoint }`,
        { 
          email: defaultUser.email,
          password: defaultUser.password,
        })
      .expect('status', SUCCESS)
      .then(async (response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const tokenValidation = await validations.tokenValidation(result.token);
        expect(tokenValidation).toEqual(defaultUser.userId);
      });
  });
});

describe('Testing products endpoint', () => {
  it('Should be able to get a list of all products', async () => {
    await frisby
        .get(`${ apiUrl }${ productsEndpoint }`)
      .expect('status', SUCCESS)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.length).toBeGreaterThanOrEqual(11);
      });
  });
});

describe('Testing sales endpoint', () => {
  beforeAll(() => {
    frisby.globalSetup({
      request: {
        headers: {
          'Authorization': Utils.generateToken(defaultUser.userId),
          'Content-Type': 'application/json',
        }
      }
    });
  })

  it('Should be able to create a sale', async () => {
    await frisby
        .post(`${ apiUrl }${ salesEndpoint }`, {
          products: [
            {
                productId: '1', 'quantity': 10
            },
            {
                productId: '2', 'quantity': 10
            }
          ],
          userId: '1',
          price: '600',
          address: 'Rua. Qualquer Uma',
          num: '123',
          status: 'pendente'
        })
      .expect('status', SUCCESS)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Sale created.');
      });
  });

  it('Should be able to get a sale by userId', async () => {
    await frisby
        .get(`${ apiUrl }${ salesEndpoint }/${defaultUser.userId}`)
      .expect('status', SUCCESS)
      .then((response) => {
        const { body } = response;
        console.log(response)
        const result = JSON.parse(body);
        expect(result.length).toBeGreaterThanOrEqual(1);
      });
  });
});
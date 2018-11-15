const signInService = require('../../server/authentication/signInService');
const config = require('../../server/config');
const nock = require('nock');

describe('signInService', () => {
  let service;
  let in15Mins;
  let realDateNow;

  beforeEach(() => {
    fakeOauth = nock(`${config.nomis.authUrl}`);
    service = signInService();
    realDateNow = Date.now.bind(global.Date);
    in15Mins = new Date('May 31, 2018 12:15:00').getTime();
    const time = new Date('May 31, 2018 12:00:00');
    global.Date = jest.fn(() => time);
  });

  afterEach(() => {
    global.Date = realDateNow;
  });

  describe('getUser', () => {
    test('should return user object if all apis succeed', () => {
      const expectedOutput = {
        token: 'type token',
        refreshToken: 'refresh',
        username: 'un',
        refreshTime: in15Mins,
      };

      return expect(service.getUser('type token', 'refresh', '1200', 'un')).resolves.toEqual(expectedOutput);
    });
  });
});
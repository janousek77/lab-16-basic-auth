'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing article router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/articles', () => {
    it('should respond with an article', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/articles`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'example title')
        .field('content', 'cool beans')
        .attach('image', `${__dirname}/assets/data.gif`);
      })
      .then(res => {
        console.log('res.body', res.body);
        expect(res.status).toEqual(200);
        expect(res.body.content).toEqual('cool beans');
        expect(res.body.title).toEqual('example title');
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.photoURI).toExist();
      });
    });
  });
});

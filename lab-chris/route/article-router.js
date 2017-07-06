'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Article = require('../model/article.js');

const articleRouter = module.exports = new Router();
articleRouter.post('/api/articles', bearerAuth, s3Upload('image'), (req, res, next) => {
  // console.log('hit POST /api/articles');
  // console.log('user', req.user);
  // console.log('file', req.file);
  // console.log('s3Data', req.s3Data);

  new Article({
    title: req.body.title,
    content: req.body.content,
    userID: req.user._id.toString(),
    photoURI: req.s3Data.Location,
  })
  .save()
  .then(article => res.json(article))
  .catch(next);
});

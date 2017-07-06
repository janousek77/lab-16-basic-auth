'use strict';

const awsMock = require('aws-sdk-mock');

awsMock.mock('S3', 'upload', function(params, callback){
  if(params.ACL !== 'public-read')
    return callback(new Error('ACL must be public read'));
  if(params.bucket !== 'fake-bucket')
    return callback(new Error('bucket must equal fake bucket'));
  if(!params.Key)
    return callback(new Error('key must be set'));
  if(!params.Body)
    return callback(new Error('body must be set'));

  callback(null, {
    Key: params.Key,
    Location: `fakeaws.s3.com/fake-bucket/$(params.Key)`,
  });
});

awsMock.mock('S3', 'deleteObject', function(params, callback){
  if(!params.Key)
    return callback('key must be set');
  if(params.bucket !== 'fake-bucket')
    return callback(new Error('bucket must equal fake bucket'));
  callback();
});

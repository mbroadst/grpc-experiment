'use strict';
const assert = require('assert');
const parseArgs = require('minimist');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(`${__dirname}/../server/mongodb.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const mongodb = grpc.loadPackageDefinition(packageDefinition).mongodb;

function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });

  const target = argv.target ? argv.target : 'localhost:50051';
  const client = new mongodb.Transport(target, grpc.credentials.createInsecure());
  client.sendMessage({ payload: 'THIS IS SOME BSON' }, function(err, response) {
    assert.equal(err, null);
    console.dir(response);
  });
}

main();

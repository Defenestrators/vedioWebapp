'use strict';

require('letsencrypt-express').create({

  server: 'staging'

, email: 'menongorav@gmail.com'

, agreeTos: true

, approveDomains: [ 'ucla-vidme.herokuapp.com' ]

, app: require('express')().use('/', function (req, res) {
    res.end('Hello, World!');
  })

}).listen(80, 443);

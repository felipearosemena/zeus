const https = require('https')
const fetch = require('node-fetch')
const map = require('./config/map.json')
const config = require('./config/site.json')

let tests = {};

// Used for localhost https authentication
const agent = new https.Agent({
  rejectUnauthorized: false
})

map
  .forEach(function (post) {

    tests[`${post.post_title}`] = browser => {

      browser.url(post.guid).expect.element('body').to.be.present.before(500);

      browser.perform(done => {
        fetch(post.guid, {
          method: "HEAD",
          // Need to pass the https agent for https requests on localhost
          agent: post.guid.indexOf('https') > -1 ? agent : null
        })
        .then(res => {
          browser.assert.equal(res.status, 200, 'Check status');
          done()
        })
        // node-fetch requires handling of promise failure
        .catch(err => {
          browser.assert.fail(JSON.stringify(err), `Failed to perform fetch on ${post.guid}`)
          done()
        })
      })

    }

  });

module.exports = tests;

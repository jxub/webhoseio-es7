'use strict';

const webhoseio = require('../webhoseio');

const client = webhoseio.config({token: '61b50ab2-2f53-43f8-8b89-59ad8a5e65gb'});

async function queryApi(queryThing = 'russia election') {
  let output
  try {
    output = await client.query('filterWebData', {q: queryThing})
    console.log(output['posts'][0]['text'])
    // fetch the next page of the API
    output = await client.getNext()
    console.log(output['posts'][0]['thread']['site']);    
  } catch (e) {
    console.log('error getting data')
  }
}

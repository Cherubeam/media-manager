const Trakt = require('trakt.tv')

const secrets = require('../../secrets/secrets')

let options = {
    client_id: secrets.apiCredentials.traktClientId,
    client_secret: secrets.apiCredentials.traktClientSecret,
    redirect_uri: null,     // defaults to 'urn:ietf:wg:oauth:2.0:oob'
    api_url: null,          // defaults to 'https://api.trakt.tv'
    useragent: null,        // defaults to 'trakt.tv/<version>'
    pagination: true,       // defaults to false, global pagination (see below)
    debug: true             // get debug logs of the requests executed in your console
}

console.log('--- Trakt.tv ---')

const trakt = new Trakt(options)
//console.log(trakt)

const traktAuthUrl = trakt.get_url()
//console.log(traktAuthUrl)

trakt.exchange_code('code', 'csrf token (state)').then((result) => {
    // contains tokens & session information
    // API can now be used with authorized requests
    console.log(result)
}).catch((error) => {
    console.log(error)
})

export function Rank(cards){
    var request = require('request');
    request.get(`http://rainman.leanpoker.org/rank?cards=${cards}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            return body;
         }
    })
}
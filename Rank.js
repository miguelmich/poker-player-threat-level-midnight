const axios = require('axios');
class Rank {  
    static async getRank(cards) {
        const url = `http://rainman.leanpoker.org/rank?cards=${encodeURIComponent(JSON.stringify(cards))}`;
    
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}
  
module.exports = Rank;
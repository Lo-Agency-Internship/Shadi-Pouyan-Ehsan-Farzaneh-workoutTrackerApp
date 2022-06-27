const crypto = require("crypto");

let HashId = [];

module.exports = {
    HashCookie: (hashCookie) => {
        const cookie = hashCookie;
        let ArrayCookie = cookie.split(";")
        ArrayCookie = ArrayCookie.map(e=>e.trim())
        const FindCookie = ArrayCookie.filter(el => el.startsWith('Hash='))
        const userIdHash = FindCookie[0].split("=")[1];
        return userIdHash;
    },

  


    setHashId: (id,Hash) => {
        HashId.push({
            id,
            Hash
        })
        return
    },

    getHashId: (Hash) => {
        return HashId.find(e => e.Hash === Hash)
    }
    
}

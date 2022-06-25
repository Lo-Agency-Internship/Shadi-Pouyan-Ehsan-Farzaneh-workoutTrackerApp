const crypto = require("crypto");

let HashId = [];

module.exports = {
    HashCookie: (hashCookie) => {
        const cookie = hashCookie;
        const userIdHash = cookie.split("=")[1];
        return userIdHash;
    },


    setHashId: (id, Hash) => {
        HashId.push({
            id,
            Hash
        })
        return
    },

    getHashId: (Hash) => {
        return HashId.find(obj => obj.Hash === Hash)
    }

}
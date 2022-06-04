const path = require("path");
const fs = require("fs");

module.exports = {
    load: ()=>{
        const file = path.join(__dirname,"public","data")
        const data = fs.readFileSync(file).toString();
        return data;
    },

    save: (content) =>{
        const file = path.join(__dirname,"public","data")
        fs.writeFileSync(file, JSON.stringify(content))
        return
    }
}
const Event = require('../Structures/PoruEvent');
module.exports = class extends Event {

 
    async run(node) {

    console.log(`${node.name} is ready!`);

    
  }}
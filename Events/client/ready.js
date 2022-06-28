const Event = require('../../Structures/Event');
module.exports = class extends Event {

 
    async run() {

    console.log(`${this.client.user.tag} is ready!`);

    this.client.user.setActivity("PARAS DOCS'S BOT")
    this.client.poru.init(this.client)
    
  }}
const { Client, Collection } = require('discord.js');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const path = require('path');
const { readdirSync } = require("fs");
const Command = require('./Command.js');
const Event = require('./Event.js');
const PoruEvent = require('./PoruEvent.js');


const {Poru} = require("poru")
module.exports = class Poruthis extends Client {

    constructor(options = {}) {
        super({
          partials: ["MESSAGE", "CHANNEL", "REACTION"],
          intents: [
            "GUILDS",
            "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
           });
        

        this.commands = new Collection();
        this.aliases = new Collection();
        this.events = new Collection();
        this.poruEvents = new Collection()
        this.slash = new Collection();
        this.cooldowns = new Collection();
        this.config = require("../config.json")
        this.poru = new Poru(this,this.config.nodes);
      
     

 }

async loadCommands() {
    return glob(`${this.directory}Commands/**/*.js`).then(commands => {
        for (const commandFile of commands) {
            delete require.cache[commandFile];
            const { name } = path.parse(commandFile);
            const File = require(commandFile);
            if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
            const command = new File(this, name.toLowerCase());
            if (!(command instanceof Command)) throw new TypeError(`Comamnd ${name} doesnt belong in Commands.`);
            this.commands.set(command.name, command);
            if (command.aliases.length) {
                for (const alias of command.aliases) {
                    this.aliases.set(alias, command.name);
                }
            }
        }
    });
}






get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
}

isClass(input) {
    return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
}


async loadEvents() {
    return glob(`${this.directory}Events/**/*.js`).then(events => {
          
        for (const eventFile of events) {
            delete require.cache[eventFile];
            const { name } = path.parse(eventFile);
            const File = require(eventFile);
            if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
            const event = new File(this, name);
            if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
            this.events.set(event.name, event);
            event.emitter[event.type](name, (...args) => event.run(...args));
        }
    });
}


async loadPoruEvents() {
    return glob(`${this.directory}PoruEvents/**/*.js`).then(events => {
          
        for (const eventFile of events) {
            delete require.cache[eventFile];
            const { name } = path.parse(eventFile);
            const File = require(eventFile);
            if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
            const event = new File(this, name);
            if (!(event instanceof PoruEvent)) throw new TypeError(`Event ${name} doesn't belong in Events`);
            this.events.set(event.name, event);
            event.emitter[event.type](name, (...args) => event.run(...args));
        }
    });
}









async start() {
 
    await this.loadCommands();
    await this.loadEvents();
    await this.loadPoruEvents();
    super.login(process.env.TOKEN);
 }



}
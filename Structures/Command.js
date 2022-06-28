module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No description provided.';
}

	// eslint-disable-next-line no-unused-vars
	async run(client,message, args) {
        
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

};
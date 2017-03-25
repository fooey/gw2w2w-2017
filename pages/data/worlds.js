import JsonEndpoint from '../../lib/middleware/JsonEndpoint.js';
import api from '../../lib/api';

export default class dataWorlds {
	static middleware() {
		return [JsonEndpoint];
	}

	constructor() {
		this.worlds = [];
	}

	handleRoute(next) {
		// return getWorlds().then(worlds => {
		// 	// console.log('worlds', JSON.stringify(worlds));
		// 	this.worlds = worlds;
		// 	return { code: 200 };
		// });

		return api.getAllWorlds().then(worlds => {
			this.worlds = worlds;
			return next({ code: 200 });
		});
	}

	getResponseData() {
		return this.worlds;
	}
}

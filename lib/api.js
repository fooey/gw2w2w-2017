import _ from 'lodash';

import axios from 'axios';
import Promise from 'bluebird';

const cache = new Map();

const LANGS = {
	en: { slug: 'en', name: 'English', link: '/en' },
	es: { slug: 'es', name: 'Deutsch', link: '/es' },
	de: { slug: 'de', name: 'Español', link: '/de' },
	fr: { slug: 'fr', name: 'Français', link: '/fr' },
	zh: { slug: 'zh', name: '汉字', link: '/zh' },
};

function slugify(str) {
	return _.words(_.deburr(str).toLowerCase()).join('-');
}


function get(endpoint) {
	return axios.get(`https://api.guildwars2.com${endpoint}`).then(response => {
		return response.data;
	});
}

function getWorlds({lang='en', ids='all'}) {
	return get(`/v2/worlds?ids=${ids}&lang=${lang}`);
}

function getAllWorlds() {
	const cacheKey = 'allWorlds';

	if (cache.has(cacheKey)) {
		return Promise.resolve(cache.get(cacheKey));
	}

	return Promise.props({
		en: getWorlds({ lang: 'en' }),
		es: getWorlds({ lang: 'es' }),
		de: getWorlds({ lang: 'de' }),
		fr: getWorlds({ lang: 'fr' }),
		zh: getWorlds({ lang: 'zh' }),
	}).then(props => {
		const worlds = {};

		_.forEach(props, (langWorlds, langSlug) => {
			_.forEach(langWorlds, world => {
				const { id: intId, name } = world;
				const id = intId.toString();
				const slug = slugify(name);
				const link = ['', langSlug, slug].join('/');

				const newWorld = _.get(worlds, world.id, { id });
				newWorld[langSlug] = {
					name,
					slug,
					link,
				};
				_.set(worlds, id, newWorld);
			})
		});

		cache.set(cacheKey, worlds);

		return worlds;
	});
}

export default {
	LANGS,

	get,
	getWorlds,
	getAllWorlds,

	slugify,
};

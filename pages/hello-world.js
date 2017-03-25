import React from 'react';
import HelloWorld from '../components/hello-world';
import Nav from '../components/nav';

export default class SimplePage {
	getElements() {
		return <div>
			<Nav />
			<HelloWorld/>
		</div>;
	}

	getMetaTags() {
		return [
			{charset: 'utf8'},
			{'http-equiv': 'x-ua-compatible', 'content': 'ie=edge'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{name: 'description', content: 'hello world, powered by React Server'},
			{name: 'generator', content: 'React Server'},
		];
	}
}


import React from "react";
import Nav from '../components/nav';

export default class testPage {
	handleRoute(next) {
		// Kick off data requests here.
		const params = this.getRequest().getRouteParams();

		console.log('this.getRequest()', this.getRequest());
		console.log('params', params);
		return next();
	}

	getElements() {
		const { params } = this.state;

		return <div>
			<Nav />
			<h1>This is testPage.</h1>
			<h2>{JSON.stringify(params)}</h2>
		</div>
	}
}

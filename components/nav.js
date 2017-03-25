
import React from "react";
import {Link} from "react-server";

export default () => (
	<ul>
		<li><Link reuseDom={true} href="/">home</Link></li>
		<li><Link reuseDom={true} href="/test">test</Link></li>
		<li><Link reuseDom={true} href="/test/test1">test/test1</Link></li>
		<li><Link reuseDom={true} href="/test/test2">test/test2</Link></li>
		<li><a href="/data/worlds.json">worlds</a></li>
	</ul>
);

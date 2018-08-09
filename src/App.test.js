import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import App from "./App";
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter()});

describe("App", () => {
	let mountedApp;
	const app = () => {
		if(!mountedApp){
			mountedApp=shallow(
				<App/>
			);
		}
		return mountedApp;
	}

	beforeEach(() => {
		mountedApp = undefined;
	});

	//All test go here
	it("always render a div", () => {
		const divs = app().find("div");
		expect(divs.length).toBeGreaterThan(0);
	});

	it("renders a WidgetForm", () => {
		const divs = app().find("WidgetForm");
		expect(divs.length).toBeGreaterThan(0);
	});

	it("renders a WidgetViewer", () => {
		const divs = app().find("WidgetViewer");
		expect(divs.length).toBeGreaterThan(0);
	});
});
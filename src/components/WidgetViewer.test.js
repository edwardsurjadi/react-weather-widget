import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import WidgetViewer from "./WidgetViewer";
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter()});

describe("App", () => {
	let props;
	let mountedWidgetViewer;
	const app = () => {
		if(!mountedWidgetViewer){
			mountedWidgetViewer=shallow(
				<WidgetViewer {...props}/>
			);
		}
		return mountedWidgetViewer;
	}

	beforeEach(() => {
	 	const mockGeolocation={
 			getCurrentPosition:function(){
 				return {"latitude":0, "longitude":0};
	 		}
	 	}
	 	global.navigator.geolocation=mockGeolocation;
		props ={
			title: undefined,
			temperatureUnit: undefined,
			windEnabled: undefined
		}
		mountedWidgetViewer = undefined;
	});

	//All test go here
	it("always render a div", () => {
		const divs = app().find("div");
		expect(divs.length).toBeGreaterThan(0);
	});

	it("displays title based on the setting", () => {
		const wrapper = mount(<WidgetViewer title="MY WIDGET"/>);
		expect(wrapper.contains("MY WIDGET")).toEqual(true);
	});

	it("displays wind information if it is enabled", () => {
		const wrapper = mount(<WidgetViewer windEnabled={true}/>);
		expect(wrapper.contains(<span className="label">Wind</span>)).toEqual(true);
	});

	it("hides wind if information it is disabled", () => {
		const wrapper = mount(<WidgetViewer windEnabled={false}/>);
		expect(wrapper.contains(<span className="label">Wind</span>)).toEqual(false);
	});

	it("displays information in metric based on setting", () => {
		const wrapper = mount(<WidgetViewer temperatureUnit="metric" windEnabled={true}/>);
		expect(wrapper.contains(<span>km/h</span>)).toEqual(true);
	});

	it("displays information in imperial based on setting", () => {
		const wrapper = mount(<WidgetViewer temperatureUnit="imperial" windEnabled={true}/>);
		expect(wrapper.contains(<span>mph</span>)).toEqual(true);
	});
});
import React from 'react';
import { configure, mount } from 'enzyme';
import WidgetForm from "./WidgetForm";
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter()});

describe("WidgetForm", () => {
	let props;
	let mountedWidgetForm;
	const widgetForm = () => {
		if(!mountedWidgetForm){
			mountedWidgetForm=mount(
				<WidgetForm {...props}/>
			);
		}
		return mountedWidgetForm;
	}

	beforeEach(() => {
		props = {
			onDataChange: undefined
		};
		mountedWidgetForm = undefined;
	});

	//All test go here
	it("always render a div", () => {
		const divs = widgetForm().find("div");
		expect(divs.length).toBeGreaterThan(0);
	});

	it("renders more than 1 input element", () => {
		const inputs = widgetForm().find("input");
		expect(inputs.length).toBeGreaterThan(0);
	});

	it("calls onDataChange when form is modified", () => {
	 	const onDataChange = sinon.spy();
		const wrapper = mount(<WidgetForm onDataChange={onDataChange}/>);

		const textbox = wrapper.find("input[type='text']").first();

		textbox.simulate("change", {target: {value:'mywidget'}});
		expect(onDataChange.callCount).toEqual(1);
	});

});
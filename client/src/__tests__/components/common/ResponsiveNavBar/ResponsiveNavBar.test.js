import React from 'react';
import {shallow} from 'enzyme';
import ResponsiveNavBar from '../../../../app/components/common/ResponsiveNavBar/ResponsiveNavBar';

describe('ResponsiveNavBar', () => {
    let shallowWrapper;
    let props;
    const wrapper = () => {
        if (!shallowWrapper) {
            shallowWrapper = shallow(<ResponsiveNavBar {...props}/>);
        }
        return shallowWrapper;
    };

    beforeEach(() => {
        props = {};
        shallowWrapper = undefined;
    });

    describe('render', () => {
        it('should return an IconButton with an Menu icon', () => {
            expect(wrapper()).toMatchSnapshot();
        });
        it('should return an IconButton with an X icon', () => {
            const getElementByIdSpy = jest.spyOn(document, 'getElementById');
            let className = 'sideBar';
            getElementByIdSpy.mockImplementation(() => ({
                className
            }));
            wrapper().find('IconButton').first().props().onClick();
            expect(wrapper()).toMatchSnapshot();
        });
    });
});
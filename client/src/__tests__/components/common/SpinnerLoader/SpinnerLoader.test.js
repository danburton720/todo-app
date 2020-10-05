import React from 'react';
import {shallow} from 'enzyme';
import SpinnerLoader from '../../../../app/components/common/SpinnerLoader/SpinnerLoader';

describe('SpinnerLoader', () => {
    let shallowWrapper;
    let props;
    const wrapper = () => {
        if (!shallowWrapper) {
            shallowWrapper = shallow(<SpinnerLoader {...props}/>);
        }
        return shallowWrapper;
    };

    beforeEach(() => {
        props = {};
        shallowWrapper = undefined;
    });

    describe('render', () => {
        it('should return a div with a Loader component', () => {
            expect(wrapper()).toMatchSnapshot();
        });
    });
});
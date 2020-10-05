import React from 'react';
import {shallow} from 'enzyme';
import Toggle from '../../../../app/components/common/Toggle/Toggle';

describe('Toggle', () => {
    let shallowWrapper;
    let props;
    const wrapper = () => {
        if (!shallowWrapper) {
            shallowWrapper = shallow(<Toggle {...props}/>);
        }
        return shallowWrapper;
    };

    beforeEach(() => {
        props = {
            enabled: false,
            onToggle: jest.fn()
        };
        shallowWrapper = undefined;
    });

    describe('render', () => {
        it('should return a toggle wrapper div with some child divs', () => {
            expect(wrapper()).toMatchSnapshot();
        });
        it('should return a toggle wrapper div which has a class name of active along with some child divs', () => {
            props.enabled = true;
            expect(wrapper()).toMatchSnapshot();
        });
    });

    describe('functionality', () => {
        describe('div (.toggleWrapper)', () => {
            describe('onClick', () => {
                it('should call the prop onToggle', () => {
                    expect(props.onToggle).not.toHaveBeenCalled();
                    wrapper().find('div').first().props().onClick();
                    expect(props.onToggle).toHaveBeenCalledTimes(1);
                });
            });
        });
    });
});
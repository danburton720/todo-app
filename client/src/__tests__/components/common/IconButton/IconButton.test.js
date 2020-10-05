import React from 'react';
import {shallow} from 'enzyme';
import IconButton from '../../../../app/components/common/IconButton/IconButton';

describe('IconButton', () => {
    let shallowWrapper;
    let props;
    const wrapper = () => {
        if (!shallowWrapper) {
            shallowWrapper = shallow(<IconButton {...props}/>);
        }
        return shallowWrapper;
    };

    beforeEach(() => {
        props = {
            onClick: jest.fn(),
            size: 20,
            icon: () => <div/>
        };
        shallowWrapper = undefined;
    });

    describe('render', () => {
        it('should return a button with an Icon component', () => {
            expect(wrapper()).toMatchSnapshot();
        });
    });

    describe('functionality', () => {
        describe('button', () => {
            describe('onClick', () => {
                it('should call the prop onClick', () => {
                    expect(props.onClick).not.toHaveBeenCalled();
                    wrapper().find('button').first().props().onClick();
                    expect(props.onClick).toHaveBeenCalledTimes(1);
                });
            });
        });
    });
});
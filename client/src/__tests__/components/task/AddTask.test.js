import React from 'react';
import {mount} from 'enzyme';
import AddTask from '../../../app/components/task/AddTask';

describe('AddTask', () => {
    let mountWrapper;
    let props;
    const wrapper = () => {
        if (!mountWrapper) {
            mountWrapper = mount(<AddTask {...props}/>);
        }
        return mountWrapper;
    };

    beforeEach(() => {
        props = {
            onSubmit: jest.fn()
        };
        mountWrapper = undefined;
    });

    describe('render', () => {
        it('should return a Plus component and an \'Add Task\' span', () => {
            expect(wrapper()).toMatchSnapshot();
        });
        it('should return an add task form', () => {
            wrapper().find('div').props().onClick();
            wrapper().update();
            expect(wrapper()).toMatchSnapshot();
        });
    });

    describe('functionality', () => {
        describe('form', () => {
            beforeEach(() => {
                wrapper().find('div').props().onClick();
                wrapper().update();
            });
            describe('onSubmit', () => {
                it('should call the prop onSubmit after setting the input value to \'hello world\' ' +
                    'then remove the form and render the Plus component', () => {
                    const onChangeEvent = {
                        target: {
                            value: 'hello world'
                        }
                    };
                    const submitEvent = {
                        preventDefault: jest.fn()
                    };
                    expect(props.onSubmit).not.toHaveBeenCalled();
                    wrapper().find('input').props().onChange(onChangeEvent);
                    wrapper().update();
                    expect(wrapper().find('input').props().value).toBe('hello world')

                    wrapper().find('form').props().onSubmit(submitEvent);
                    wrapper().update();
                    expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1);
                    expect(props.onSubmit).toHaveBeenCalledTimes(1);

                    expect(wrapper()).toMatchSnapshot();
                });
            });
        });
    });
});
import React from 'react';
import {mount} from 'enzyme';
import AddTodo from '../../../app/components/todo/AddTodo';

describe('AddTodo', () => {
    let mountWrapper;
    let props;
    const wrapper = () => {
        if (!mountWrapper) {
            mountWrapper = mount(<AddTodo {...props}/>);
        }
        return mountWrapper;
    };

    beforeEach(() => {
        props = {
            onSubmit: jest.fn(),
            cancel: jest.fn()
        };
        mountWrapper = undefined;
    });

    describe('render', () => {
        it('should return a form with an input and two buttons', () => {
            expect(wrapper()).toMatchSnapshot();
        });
    });

    describe('functionality', () => {
        describe('input', () => {
            it('should set the input value to \'hello world\'', () => {
                const onChangeEvent = {
                    target: {
                        value: 'hello world'
                    }
                };
                wrapper().find('input').props().onChange(onChangeEvent);
                wrapper().update();
                expect(wrapper().find('input').props().value).toBe('hello world')
            });
        });
        describe('form', () => {
            describe('onSubmit', () => {
                it('should call the prop onSubmit and clear the input', () => {
                    const onChangeEvent = {
                        target: {
                            value: 'hello world'
                        }
                    };
                    const submitEvent = {
                        preventDefault: jest.fn()
                    };
                    wrapper().find('input').props().onChange(onChangeEvent);
                    wrapper().update();
                    expect(wrapper().find('input').props().value).toBe('hello world');
                    wrapper().find('form').props().onSubmit(submitEvent);
                    expect(submitEvent.preventDefault).toHaveBeenCalledTimes(1);
                    wrapper().update();
                    expect(props.onSubmit).toHaveBeenCalledTimes(1);
                    expect(props.onSubmit).toHaveBeenCalledWith({
                        description: 'hello world'
                    });
                    expect(wrapper().find('input').props().value).toBe('');
                });
            });
        });
    });
});
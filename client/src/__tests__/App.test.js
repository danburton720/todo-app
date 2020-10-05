import React from 'react';
import {shallow} from 'enzyme';
import App from '../app/App';
import {socket} from '../app/util/socket';

jest.mock('../app/util/socket', () => ({
    socket: {
        on: jest.fn()
    }
}));

describe('App', () => {
    let shallowWrapper;
    let props;
    const wrapper = () => {
        if (!shallowWrapper) {
            shallowWrapper = shallow(<App {...props}/>);
        }
        return shallowWrapper;
    };

    beforeEach(() => {
        props = {};
        shallowWrapper = undefined;
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should return ResponsiveNavBar, TodosContainer and TasksContainer', () => {
            expect(wrapper()).toMatchSnapshot();
        });
    });

    describe('functionality', () => {
        describe('mount', () => {
            it('should call socket.on with \'connect\' and a function', () => {
                expect(socket.on).not.toHaveBeenCalled();
                wrapper();
                expect(socket.on).toHaveBeenCalledTimes(1);
                expect(socket.on).toHaveBeenCalledWith('connect', expect.any(Function));
            });
        });
    });
});
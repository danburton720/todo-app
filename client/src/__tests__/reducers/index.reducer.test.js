import {combineReducers} from 'redux';

jest.mock('redux', () => ({
    combineReducers: jest.fn()
}));

describe('index reducer', () => {
    it('should call combineReducers with the todos and tasks reducer', () => {
        return import('../../app/reducers/index.reducer').then(() => {
            expect(combineReducers).toHaveBeenCalledWith({
                todos: expect.any(Function),
                tasks: expect.any(Function)
            });
        });
    });
});
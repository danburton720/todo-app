import taskReducer, {initialState} from '../../app/reducers/task.reducer';

describe('taskReducer', () => {
    let state;
    beforeEach(() => {
        state = {
            complete: [1, 2, 3],
            incomplete: [42, 101],
            loaded: true,
            todoId: 20
        };
    });

    describe('actions', () => {
        describe('SET_TASKS', () => {
            describe('state is defined', () => {
                it('should set the todoId equal to the equivalent action meta value ' +
                    'and set the completed array equal to the payload', () => {
                    const action = {
                        type: 'SET_TASKS',
                        meta: {
                            loaded: true,
                            todoId: 15,
                            completed: true
                        },
                        payload: [4, 5, 6]
                    };
                    expect(taskReducer(state, action)).toEqual({
                        ...state,
                        todoId: 15,
                        complete: [4, 5, 6]
                    });
                });
                it('should set loaded to false and the todoId equal to the equivalent action meta value', () => {
                    const action = {
                        type: 'SET_TASKS',
                        meta: {
                            loaded: false,
                            todoId: 15
                        },
                    };
                    expect(taskReducer(state, action)).toEqual({
                        ...state,
                        loaded: false,
                        todoId: 15,
                    });
                });
            });
            describe('state is undefined', () => {
                it('should set loaded to true, the todoId equal to the equivalent action meta value ' +
                    'and set the completed array equal to the payload', () => {
                    state = undefined;
                    const action = {
                        type: 'SET_TASKS',
                        meta: {
                            loaded: true,
                            todoId: 15,
                            completed: true
                        },
                        payload: [4, 5, 6]
                    };
                    expect(taskReducer(state, action)).toEqual({
                        ...initialState,
                        loaded: true,
                        todoId: 15,
                        complete: [4, 5, 6]
                    });
                });
            });
        });
        describe('DELETE_TODO', () => {
            describe('state is defined', () => {
                it('should return the current state (id not equal to todoId value)', () => {
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 100
                    };
                    expect(taskReducer(state, action)).toEqual(state);
                });
                it('should return the initial state (id equal to todoId value)', () => {
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 20
                    };
                    expect(taskReducer(state, action)).toEqual(initialState);
                });
            });
            describe('state is undefined', () => {
                it('should return the initial state 1', () => {
                    state = undefined;
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 100
                    };
                    expect(taskReducer(state, action)).toEqual(initialState);
                });
                it('should return the initial state 2', () => {
                    state = undefined;
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 20
                    };
                    expect(taskReducer(state, action)).toEqual(initialState);
                });
            });
        });
        describe('UNKNOWN_ACTION', () => {
            describe('state is defined', () => {
                it('should return the current state', () => {
                    const action = {
                        type: 'UNKNOWN_ACTION',
                        payload: {
                            foo: 'bar'
                        }
                    };
                    expect(taskReducer(state, action)).toEqual(state);
                });
            });
            describe('state is undefined', () => {
                it('should return the initial state', () => {
                    state = undefined;
                    const action = {
                        type: 'UNKNOWN_ACTION',
                        payload: {
                            foo: 'bar'
                        }
                    };
                    expect(taskReducer(state, action)).toEqual(initialState);
                });
            });
        });
    });
});
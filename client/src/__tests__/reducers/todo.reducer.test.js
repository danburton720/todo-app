import todoReducer, {initialState} from '../../app/reducers/todo.reducer';

describe('todoReducer', () => {
    let state;
    beforeEach(() => {
        state = {
            active: 2,
            loaded: true,
            list: [{
                _id: 1,
                description: 'foo'
            }, {
                _id: 2,
                description: 'bar'
            }, {
                _id: 3,
                description: 'baz'
            }]
        };
    });

    describe('actions', () => {
        describe('SET_TODOS', () => {
            describe('state is defined', () => {
                it('should set active equal to the id of the first element within the payload array ' +
                    'and list equal to the payload', () => {
                    const action = {
                        type: 'SET_TODOS',
                        meta: {
                            loaded: true,
                        },
                        payload: [{
                            _id: 42,
                            description: 'hello'
                        }, {
                            _id: 101,
                            description: 'world'
                        }]
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...state,
                        active: 42,
                        list: [{
                            _id: 42,
                            description: 'hello'
                        }, {
                            _id: 101,
                            description: 'world'
                        }]
                    });
                });
                it('should set loaded to false and list to an empty array', () => {
                    const action = {
                        type: 'SET_TODOS',
                        meta: {
                            loaded: false,
                        }
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...state,
                        loaded: false,
                        list: []
                    });
                });
            });
            describe('state is undefined', () => {
                it('should set loaded to true, active equal to the id of the first element within the payload array ' +
                    'and list equal to the payload', () => {
                    state = undefined;
                    const action = {
                        type: 'SET_TODOS',
                        meta: {
                            loaded: true,
                        },
                        payload: [{
                            _id: 42,
                            description: 'hello'
                        }, {
                            _id: 101,
                            description: 'world'
                        }]
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...initialState,
                        loaded: true,
                        active: 42,
                        list: [{
                            _id: 42,
                            description: 'hello'
                        }, {
                            _id: 101,
                            description: 'world'
                        }]
                    });
                });
                it('should set loaded to false and list to an empty array', () => {
                    state = undefined;
                    const action = {
                        type: 'SET_TODOS',
                        meta: {
                            loaded: false,
                        }
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...initialState,
                        loaded: false,
                        list: []
                    });
                });
            });
        });
        describe('ADD_TODO', () => {
            describe('state is defined', () => {
                it('should set active equal to the id in the payload and add the payload to the list array', () => {
                    const action = {
                        type: 'ADD_TODO',
                        payload: {
                            _id: 50,
                            description: 'test'
                        }
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...state,
                        active: 50,
                        list: [{
                            _id: 1,
                            description: 'foo'
                        }, {
                            _id: 2,
                            description: 'bar'
                        }, {
                            _id: 3,
                            description: 'baz'
                        }, {
                            _id: 50,
                            description: 'test'
                        }]
                    });
                });
            });
            describe('state is undefined', () => {
                it('should set active equal to the id in the payload and set the list array to have on element that being ' +
                    'the payload', () => {
                    state = undefined;
                    const action = {
                        type: 'ADD_TODO',
                        payload: {
                            _id: 50,
                            description: 'test'
                        }
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...initialState,
                        active: 50,
                        list: [{
                            _id: 50,
                            description: 'test'
                        }]
                    });
                });
            });
        });
        describe('DELETE_TODO', () => {
            describe('state is defined', () => {
                it('should remove the todo with the id of 3 from the list', () => {
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 3
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...state,
                        list: [{
                            _id: 1,
                            description: 'foo'
                        }, {
                            _id: 2,
                            description: 'bar'
                        }]
                    });
                });
                it('should remove the todo with the id of 2 from the list and set active to 1', () => {
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 2
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...state,
                        active: 1,
                        list: [{
                            _id: 1,
                            description: 'foo'
                        }, {
                            _id: 3,
                            description: 'baz'
                        }]
                    });
                });
                it('should set list to an empty array and active to null', () => {
                    state.list = [{
                        _id: 1,
                        description: 'foo'
                    }];
                    state.active = 1;
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 1
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...state,
                        active: null,
                        list: []
                    });
                });
                it('should return the current state', () => {
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 1000
                    };
                    expect(todoReducer(state, action)).toEqual(state);
                });
            });
            describe('state is undefined', () => {
                it('should return the initial state', () => {
                    state = undefined;
                    const action = {
                        type: 'DELETE_TODO',
                        payload: 3
                    };
                    expect(todoReducer(state, action)).toEqual(initialState);
                });
            });
        });
        describe('SET_ACTIVE_TODO', () => {
            describe('state is defined', () => {
                it('should set active equal to the payload', () => {
                    const action = {
                        type: 'SET_ACTIVE_TODO',
                        payload: 50
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...state,
                        active: 50
                    });
                });
            });
            describe('state is undefined', () => {
                it('should set active equal to the payload', () => {
                    state = undefined;
                    const action = {
                        type: 'SET_ACTIVE_TODO',
                        payload: 50
                    };
                    expect(todoReducer(state, action)).toEqual({
                        ...initialState,
                        active: 50
                    });
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
                    expect(todoReducer(state, action)).toEqual(state);
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
                    expect(todoReducer(state, action)).toEqual(initialState);
                });
            });
        });
    });
});
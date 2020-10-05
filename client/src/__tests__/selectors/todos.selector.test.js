import {activeTodoSelector} from '../../app/selectors/todos.selector';

describe('todos selector', () => {
    let state;
    beforeEach(() => {
        state = {
            todos: {
                list: [{
                    _id: 1,
                    description: 'foo'
                }, {
                    _id: 2,
                    description: 'bar'
                }],
                active: 1
            }
        };
    });

    describe('activeTodoSelector', () => {
        it('should return the active todo', () => {
            expect(activeTodoSelector(state)).toEqual({
                todo: {
                    _id: 1,
                    description: 'foo'
                }
            });
        });
    });
});
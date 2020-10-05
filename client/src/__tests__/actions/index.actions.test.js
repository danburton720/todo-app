import {getAllTasks} from '../../app/actions/index.actions';
import {getTasks} from '../../app/actions/task.actions';

jest.mock('../../app/actions/task.actions', () => ({
    getTasks: jest.fn()
}));

describe('todo index actions', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTasks', () => {
        it('should call getTasks twice with the relevant arguments for complete and incomplete tasks with fetchingMore set to true', () => {
            const dispatch = jest.fn();
            getAllTasks(1, true)(dispatch);
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(getTasks).toHaveBeenCalledTimes(2);
            expect(getTasks).toHaveBeenNthCalledWith(1, 1, true, true);
            expect(getTasks).toHaveBeenNthCalledWith(2, 1, false, true);
        });
        it('should call getTasks twice with the relevant arguments for complete and incomplete tasks with fetchingMore set to false', () => {
            const dispatch = jest.fn();
            getAllTasks(1, false)(dispatch);
            expect(dispatch).toHaveBeenCalledTimes(2);
            expect(getTasks).toHaveBeenCalledTimes(2);
            expect(getTasks).toHaveBeenNthCalledWith(1, 1, true, false);
            expect(getTasks).toHaveBeenNthCalledWith(2, 1, false, false);
        });
    });
});
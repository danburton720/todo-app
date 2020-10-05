import io from 'socket.io-client';

jest.mock('socket.io-client', () => ({
    default: jest.fn(),
    __esModule: true
}));

describe('socket', () => {
    it('should call io with a base url string', () => {
        return import('../../app/util/socket').then(() => {
            expect(io).toHaveBeenCalledTimes(1);
            expect(io).toHaveBeenCalledWith('http://localhost:5000');
        });
    });
});
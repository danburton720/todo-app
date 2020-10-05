import axios from 'axios';

jest.mock('axios', () => ({
    create: jest.fn()
}));

describe('axiosInstance', () => {
    it('should call axios.create with a baseURL', () => {
        return import('../../app/util/axiosInstance').then(() => {
            expect(axios.create).toHaveBeenCalledTimes(1);
            expect(axios.create).toHaveBeenCalledWith({
                baseURL: 'http://localhost:5000'
            });
        });
    });
});
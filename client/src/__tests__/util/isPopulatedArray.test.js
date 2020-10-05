import isPopulatedArray from '../../app/util/isPopulatedArray';

describe('isPopulatedArray', () => {
    it('should return true when source is a populated array', () => {
        expect(isPopulatedArray([1,2,3])).toBe(true);
    });
    it('should return false when source is an empty array', () => {
        expect(isPopulatedArray([])).toBe(false);
    });
    it('should return false when source is a number', () => {
        expect(isPopulatedArray(42)).toBe(false);
    });
    it('should return false when source is a string', () => {
        expect(isPopulatedArray('foo')).toBe(false);
    });
    it('should return false when source is a object', () => {
        expect(isPopulatedArray({
            foo: 'bar'
        })).toBe(false);
    });
    it('should return false when source is a boolean', () => {
        expect(isPopulatedArray(true)).toBe(false);
    });
});
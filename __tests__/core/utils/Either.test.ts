import {Either} from '../../../src/core/utils/Either';

describe('Either', () => {
  describe('success', () => {
    it('creates a success instance', () => {
      const result = Either.success<string, number>(42);
      expect(result.isSuccess()).toBe(true);
      expect(result.getValue()).toBe(42);
    });

    it('throws an error when trying to get error from success instance', () => {
      const result = Either.success<string, number>(42);
      expect(() => result.getError()).toThrow(
        'This instance of the Either class is a success. Cannot return error.',
      );
    });
  });

  describe('failure', () => {
    it('creates a failure instance', () => {
      const error = 'Something went wrong';
      const result = Either.failure<string, number>(error);
      expect(result.isSuccess()).toBe(false);
      expect(result.getError()).toBe(error);
    });

    it('throws an error when trying to get value from failure instance', () => {
      const result = Either.failure<string, number>('error');
      expect(() => result.getValue()).toThrow(
        'This instance of the Either class is a failure. Cannot return value.',
      );
    });
  });

  describe('resolve', () => {
    it('calls onSuccess for success instance', () => {
      const result = Either.success<string, number>(42);
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      result.resolve(onFailure, onSuccess);

      expect(onSuccess).toHaveBeenCalledWith(42);
      expect(onFailure).not.toHaveBeenCalled();
    });

    it('calls onFailure for failure instance', () => {
      const error = 'Something went wrong';
      const result = Either.failure<string, number>(error);
      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      result.resolve(onFailure, onSuccess);

      expect(onFailure).toHaveBeenCalledWith(error);
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it('returns the value from onSuccess for success instance', () => {
      const result = Either.success<string, number>(42);
      const resolved = result.resolve(
        () => 'failure',
        value => `success: ${value}`,
      );
      expect(resolved).toBe('success: 42');
    });

    it('returns the value from onFailure for failure instance', () => {
      const result = Either.failure<string, number>('error');
      const resolved = result.resolve(
        error => `failure: ${error}`,
        () => 'success',
      );
      expect(resolved).toBe('failure: error');
    });
  });
});

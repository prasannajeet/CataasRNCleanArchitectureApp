/**
 * An opionated Typescript take on ArrowKt's Either class originally written in Kotlin.
 * Using this to handle API responses in the app
 *
 * @see https://apidocs.arrow-kt.io/arrow-core/arrow.core/-either/index.html
 */
export class Either<E, A> {
  private constructor(
    private readonly value: A | E,
    private readonly _isSuccess: boolean,
  ) {}

  /**
   * Create a success instance
   */
  static success<E, A>(value: A): Either<E, A> {
    return new Either<E, A>(value, true);
  }

  /**
   * Create a failure instance
   */
  static failure<E, A>(error: E): Either<E, A> {
    return new Either<E, A>(error, false);
  }

  /**
   * Handle both success and failure cases
   */
  resolve<B>(onFailure: (e: E) => B, onSuccess: (a: A) => B): B {
    return this._isSuccess
      ? onSuccess(this.value as A)
      : onFailure(this.value as E);
  }

  /**
   * Check if this is a success
   */
  isSuccess(): boolean {
    return this._isSuccess;
  }

  getValue(): A {
    if (!this.isSuccess()) {
      throw new Error(
        'This instance of the Either class is a failure. Cannot return value.',
      );
    }
    return this.value as A;
  }

  getError(): E {
    if (this.isSuccess()) {
      throw new Error(
        'This instance of the Either class is a success. Cannot return error.',
      );
    }
    return this.value as E;
  }
}

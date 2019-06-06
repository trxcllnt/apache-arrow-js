import { DataType } from '../type';
/**
 * Dynamically compile the null values into an `isValid()` function whose
 * implementation is a switch statement. Microbenchmarks in v8 indicate
 * this approach is 25% faster than using an ES6 Map.
 * @ignore
 * @param nullValues
 */
export declare function createIsValidFunction<T extends DataType = any, TNull = any>(nullValues?: ReadonlyArray<TNull>): (value: any) => boolean;

import { Chunked } from './chunked';
import { BaseVector } from './base';
import { VectorType as V } from '../interfaces';
import { VectorBuilderOptions } from './index';
import { VectorBuilderOptionsAsync } from './index';
import { Date_, DateDay, DateMillisecond } from '../type';
/** @ignore */
export declare class DateVector<T extends Date_ = Date_> extends BaseVector<T> {
    static from<T extends Date_ = DateMillisecond, TNull = any>(input: Iterable<Date | TNull>): V<T>;
    static from<T extends Date_ = DateMillisecond, TNull = any>(input: AsyncIterable<Date | TNull>): Promise<V<T>>;
    static from<T extends Date_ = DateMillisecond, TNull = any>(input: VectorBuilderOptions<T, TNull>): Chunked<T>;
    static from<T extends Date_ = DateMillisecond, TNull = any>(input: VectorBuilderOptionsAsync<T, TNull>): Promise<Chunked<T>>;
}
/** @ignore */
export declare class DateDayVector extends DateVector<DateDay> {
    static from<TNull = any>(input: Iterable<Date | TNull>): DateDayVector;
    static from<TNull = any>(input: AsyncIterable<Date | TNull>): Promise<DateDayVector>;
    static from<TNull = any>(input: VectorBuilderOptions<DateDay, TNull>): Chunked<DateDay>;
    static from<TNull = any>(input: VectorBuilderOptionsAsync<DateDay, TNull>): Promise<Chunked<DateDay>>;
}
/** @ignore */
export declare class DateMillisecondVector extends DateVector<DateMillisecond> {
    static from<TNull = any>(input: Iterable<Date | TNull>): DateMillisecondVector;
    static from<TNull = any>(input: AsyncIterable<Date | TNull>): Promise<DateMillisecondVector>;
    static from<TNull = any>(input: VectorBuilderOptions<DateMillisecond, TNull>): Chunked<DateMillisecond>;
    static from<TNull = any>(input: VectorBuilderOptionsAsync<DateMillisecond, TNull>): Promise<Chunked<DateMillisecond>>;
}

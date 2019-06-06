import { Builder } from '../builder';
import { DataType, Map_ } from '../type';
/** @ignore */
export declare class MapBuilder<T extends {
    [key: string]: DataType;
} = any, TNull = any> extends Builder<Map_<T>, TNull> {
    addChild(child: Builder, name?: string): number;
}

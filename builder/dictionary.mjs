// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import { Vector } from '../vector';
import { Builder } from '../builder';
/** @ignore */
export class DictionaryBuilder extends Builder {
    constructor({ 'type': type, 'nullValues': nulls, 'dictionaryHashFunction': hashFn }) {
        super({ type });
        this._codes = Object.create(null);
        this._nulls = null;
        this.indices = Builder.new({ 'type': this.type.indices, 'nullValues': nulls });
        this.dictionary = Builder.new({ 'type': this.type.dictionary, 'nullValues': null });
        if (typeof hashFn === 'function') {
            this.valueToKey = hashFn;
        }
    }
    get values() { return this.indices.values; }
    get nullCount() { return this.indices.nullCount; }
    get nullBitmap() { return this.indices.nullBitmap; }
    get byteLength() { return this.indices.byteLength; }
    get reservedLength() { return this.indices.reservedLength; }
    get reservedByteLength() { return this.indices.reservedByteLength; }
    isValid(value) { return this.indices.isValid(value); }
    setValid(index, valid) {
        const indices = this.indices;
        valid = indices.setValid(index, valid);
        this.length = indices.length;
        return valid;
    }
    setValue(index, value) {
        let keysToCodesMap = this._codes;
        let key = this.valueToKey(value);
        let idx = keysToCodesMap[key];
        if (idx === undefined) {
            keysToCodesMap[key] = idx = this.dictionary.append(value).length - 1;
        }
        return this.indices.setValue(index, idx);
    }
    flush() {
        const chunk = this.indices.flush().clone(this.type);
        this.clear();
        return chunk;
    }
    finish() {
        this.type.dictionaryVector = Vector.new(this.dictionary.finish().flush());
        return super.finish();
    }
    clear() {
        this.indices.clear();
        return super.clear();
    }
    valueToKey(val) {
        typeof val === 'string' || (val = `${val}`);
        let key = 5381, i = val.length;
        while (i > 0) {
            key = (key * 33) ^ val.charCodeAt(--i);
        }
        return key >>> 0;
    }
}

//# sourceMappingURL=dictionary.mjs.map

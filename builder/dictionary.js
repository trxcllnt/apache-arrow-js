"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const vector_1 = require("../vector");
const builder_1 = require("../builder");
/** @ignore */
class DictionaryBuilder extends builder_1.Builder {
    constructor({ 'type': type, 'nullValues': nulls, 'dictionaryHashFunction': hashFn }) {
        super({ type });
        this._codes = Object.create(null);
        this._nulls = null;
        this.indices = builder_1.Builder.new({ 'type': this.type.indices, 'nullValues': nulls });
        this.dictionary = builder_1.Builder.new({ 'type': this.type.dictionary, 'nullValues': null });
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
        this.type.dictionaryVector = vector_1.Vector.new(this.dictionary.finish().flush());
        return super.finish();
    }
    clear() {
        this.indices.clear();
        return super.clear();
    }
    valueToKey(val) {
        let str = typeof val === 'string' ? val : `${val}`;
        let h1 = 0xdeadbeef ^ 0, h2 = 0x41c6ce57 ^ 0;
        for (let i = -1, n = str.length, ch; ++i < n;) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
        h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }
}
exports.DictionaryBuilder = DictionaryBuilder;

//# sourceMappingURL=dictionary.js.map

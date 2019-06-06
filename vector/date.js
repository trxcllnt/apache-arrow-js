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
const base_1 = require("./base");
const index_1 = require("./index");
const type_1 = require("../type");
/** @ignore */
class DateVector extends base_1.BaseVector {
    /** @nocollapse */
    static from(input) {
        return index_1.vectorFromValuesWithType(() => new type_1.DateMillisecond(), input);
    }
}
exports.DateVector = DateVector;
/** @ignore */
class DateDayVector extends DateVector {
    /** @nocollapse */
    static from(input) {
        return index_1.vectorFromValuesWithType(() => new type_1.DateDay(), input);
    }
}
exports.DateDayVector = DateDayVector;
/** @ignore */
class DateMillisecondVector extends DateVector {
    /** @nocollapse */
    static from(input) {
        return index_1.vectorFromValuesWithType(() => new type_1.DateMillisecond(), input);
    }
}
exports.DateMillisecondVector = DateMillisecondVector;

//# sourceMappingURL=date.js.map
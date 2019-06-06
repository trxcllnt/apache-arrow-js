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
const schema_1 = require("../schema");
const builder_1 = require("../builder");
const type_1 = require("../type");
/** @ignore */
class MapBuilder extends builder_1.Builder {
    addChild(child, name = `${this.numChildren}`) {
        const { children, keysSorted } = this.type;
        const childIndex = this.children.push(child);
        this.type = new type_1.Map_([...children, new schema_1.Field(name, child.type, true)], keysSorted);
        return childIndex;
    }
}
exports.MapBuilder = MapBuilder;

//# sourceMappingURL=map.js.map

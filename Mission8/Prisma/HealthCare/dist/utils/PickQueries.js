"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickQueries = void 0;
const pickQueries = (obj, keys) => {
    const pickedObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            pickedObj[key] = obj[key];
        }
    }
    return pickedObj;
};
exports.pickQueries = pickQueries;

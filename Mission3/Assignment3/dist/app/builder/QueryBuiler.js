"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(QueryModel, query) {
        this.QueryModel = QueryModel;
        this.query = query;
    }
    search(searchFields) {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search) {
            const search = this.query.search;
            this.QueryModel = this.QueryModel.find({
                $or: searchFields.map(field => ({
                    [field]: {
                        $regex: search,
                        $options: 'i',
                    },
                })),
            });
        }
        return this;
    }
    sortBy() {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) {
            const sortBy = this.query.sortBy;
            this.QueryModel = this.QueryModel.sort({ [sortBy]: 1 });
        }
        return this;
    }
    sortOrder() {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortOrder) {
            const sortOrder = this.query.sortOrder;
            this.QueryModel = this.QueryModel.sort({ [sortOrder]: 1 });
        }
        return this;
    }
    filter() {
        const queryObject = Object.assign({}, this.query);
        const excludedFields = [
            'search',
            'sortBy',
            'sortOrder',
            'limit',
            'page',
            'fields',
            'select',
        ];
        excludedFields.forEach(el => {
            if (queryObject[el])
                delete queryObject[el];
        });
        console.log(queryObject);
        if (queryObject === null || queryObject === void 0 ? void 0 : queryObject.authorId) {
            queryObject.author = queryObject.authorId;
            delete queryObject.authorId;
            console.log(queryObject);
        }
        this.QueryModel = this.QueryModel.find(queryObject);
        return this;
    }
    fields() {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) {
            const fields = this.query.fields;
            this.QueryModel = this.QueryModel.select(fields.split(',').join(' '));
        }
        return this;
    }
}
exports.default = QueryBuilder;

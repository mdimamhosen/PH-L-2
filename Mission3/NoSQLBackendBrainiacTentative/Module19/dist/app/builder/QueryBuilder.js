'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class QueryBuilder {
  constructor(modelQuery, query) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  // search query
  searchTerm(searchableFields) {
    var _a;
    if (
      (_a = this === null || this === void 0 ? void 0 : this.query) === null ||
      _a === void 0
        ? void 0
        : _a.searchTerm
    ) {
      const searchTerm = this.query.searchTerm;
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }
  // filter query
  filter() {
    const queryObject = Object.assign({}, this.query);
    const skipedFields = [
      'limit',
      'page',
      'searchTerm',
      'sort',
      'select',
      'fields',
    ];
    skipedFields.forEach(field => {
      if (queryObject[field]) {
        delete queryObject[field];
      }
    });
    this.modelQuery = this.modelQuery.find(queryObject);
    return this;
  }
  // sort query
  sort() {
    var _a;
    let sort = '-createdAt';
    if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) {
      sort = this.query.sort.split(',').join(' ');
    }
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }
  // pagination query
  pagination() {
    var _a, _b;
    let page = 1;
    let skip = 0;
    let limit = 1;
    if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.limit) {
      limit = parseInt(this.query.limit, 10);
    }
    if ((_b = this.query) === null || _b === void 0 ? void 0 : _b.page) {
      page = parseInt(this.query.page, 10);
      skip = (page - 1) * limit;
    }
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  // field selection query
  fields() {
    var _a;
    const fields = (
      (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields
    )
      ? this.query.fields.split(',').join(' ')
      : '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
exports.default = QueryBuilder;

import { Query } from 'mongoose';

class QueryBuilder<T> {
  private QueryModel: Query<T[], T>;
  private query: Record<string, unknown>;

  constructor(QueryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.QueryModel = QueryModel;
    this.query = query;
  }

  search(searchFields: string[]) {
    if (this?.query?.search) {
      const search = this.query.search as string;
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
    if (this?.query?.sortBy) {
      const sortBy = this.query.sortBy as string;
      this.QueryModel = this.QueryModel.sort({ [sortBy]: 1 });
    }
    return this;
  }

  sortOrder() {
    if (this?.query?.sortOrder) {
      const sortOrder = this.query.sortOrder as string;
      this.QueryModel = this.QueryModel.sort({ [sortOrder]: 1 });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };

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
      if (queryObject[el]) delete queryObject[el];
    });

    this.QueryModel = this.QueryModel.find(queryObject);
    return this;
  }

  fields() {
    if (this?.query?.fields) {
      const fields = this.query.fields as string;
      this.QueryModel = this.QueryModel.select(fields.split(',').join(' '));
    }
    return this;
  }
}

export default QueryBuilder;

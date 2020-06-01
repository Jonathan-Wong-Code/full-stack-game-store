class APIFeatures {
  constructor(queryObj, queryStr) {
    this.queryStr = queryStr;
    this.queryObj = queryObj;
  }

  filter() {
    const queryStr = { ...this.queryStr };
    const excluded = ['sort', 'limit', 'skip', 'page', 'fields'];

    excluded.forEach((field) => delete queryStr[field]);

    let query = JSON.stringify(queryStr);
    query = query.replace(/\b(gte|lte|lt|gt)\b/g, (match) => {
      return `$${match}`;
    });

    this.queryObj = this.queryObj.find(JSON.parse(query));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.queryObj = this.queryObj.sort(sortBy);
    } else {
      this.queryObj = this.queryObj.sort('-rating title');
    }
    return this;
  }

  limit() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.queryObj = this.queryObj.select(fields);
    } else {
      this.queryObj = this.queryObj.select('-__v');
    }
    return this;
  }

  paginate() {
    const limit = this.queryStr.limit * 1;
    const page = this.queryStr.page * 1;
    const skip = (page - 1) * limit;

    this.queryObj = this.queryObj.limit(limit).skip(skip);

    return this;
  }
}

module.exports = APIFeatures;

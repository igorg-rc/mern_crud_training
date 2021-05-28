const paginate = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit
      };
    }

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    // results.results = model.slice(startIndex, endIndex);
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec()
      res.paginate = results;
      next()
    } catch (error) {
      res.status(500).json({ message: error })
    }


    next();
  };
};

module.exports = paginate
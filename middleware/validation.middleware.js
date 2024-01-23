export const validateReqBody = (validationSchema) => {
  return async (req, res, next) => {
    const newData = req.body;

    try {
      const validatedData = await validationSchema.validate(newData);

      req.body = validatedData;

      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
};

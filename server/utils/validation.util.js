exports.isValid = (bodyData, res, attributes) => {
  let isValidData = true;
  for (let index = 0; index < attributes.length; index++) {
    const e = attributes[index];
    if (bodyData[e] === '' || bodyData[e] === undefined) {
      res.status(400).send({ message: `${e.replace('_', ' ')} must be provided` });
      isValidData = false
      break;
    }
  }
  return isValidData;
};

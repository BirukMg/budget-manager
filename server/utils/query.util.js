exports.create = async (Model, data, res, returnValue = false) => {
  const createdData = await Model.create(data);

  if (createdData) {
    if (returnValue) {
      return createdData;
    }
    res.status(201).send(createdData);
    return;
  } else {
    res.status(502).send("Database error");
  }
};

exports.findOne = async (Model, option, res, returnValue = false) => {
  const data = await Model.findOne(option);
  if (data) {
    if (returnValue) {
      return data;
    }
    res.status(200).send(data);
    return;
  }
  res.status(404).send({ message: "not found" });
};

exports.findAll = async (Model, option, res, returnValue = false) => {
  const data = await Model.findAll(option);
  if (data) {
    if (returnValue) {
      return data;
    }
    res.status(200).send(data);
    return;
  }
  res.status(404).send({ message: "not found" });
};

exports.update = async (Model, data, option, res, returnValue = false) => {
  const updated = await Model.update(data, option);
  if (updated[0]) {
    if (returnValue) {
      return true;
    }
    res.status(200).send({ message: "updated successfully" });
    return;
  }
  res.status(400).send({message: 'could not update'});
};


exports.delete = async(Model, option, res) => {
  const deleted = await Model.destroy(option);
  if (deleted) {
    res.status(200).send({message: 'deleted successfully'});
    return;
  }
  res.status(400).send({message: 'could not delete'})
}
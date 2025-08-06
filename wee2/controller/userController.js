const users = [{ id: '1', name: "Samuel", age: "24", phoneNumber: "0900102030" }];

exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

exports.createUser = (req, res) => {
  const data = req.body;
  users.push(data);
  res.status(201).json({ message: "Data created successfully." });
};

exports.updateUserAge = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = users.find(u => u.id === id);
  if (user) {
    user.age = data.age;
    res.status(200).json({ message: "User age updated successfully." });
  } else {
    res.status(404).json({ message: "User not found." });
  }
};
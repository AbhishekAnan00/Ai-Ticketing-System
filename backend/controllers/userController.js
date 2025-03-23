export const createUser = async (req, res) => {
    // create user
    res.status(201).json({ message: "User created" });
  };
  
  export const getUsers = async (req, res) => {
    // get users
    res.status(200).json({ users: [] });
  };
  
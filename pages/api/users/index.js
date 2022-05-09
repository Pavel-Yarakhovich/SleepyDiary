import { apiHandler } from "helpers/api";
import dbConnect from "lib/dbConnect";
import User from "models/user";

export default apiHandler(handler);

function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      return getUsers();
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  async function getUsers() {
    await dbConnect();
    // get the users from db
    const users = User.find();
    const response = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return res.status(200).json(response);
  }
}

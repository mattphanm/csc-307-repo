import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const { name, job } = req.query;

  try {
    let users;
    if (name && job) {
      users = await userServices.findUserByNameAndJob(name, job);
    } else {
      users = await userServices.getUsers(name, job);
    }
    res.json({ users_list: users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users from database.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userServices.findUserById(id);
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user.");
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await userServices.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user.");
  }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await userServices.deleteUserById(id);
    if (!deleted) {
      res.status(404).send("User not found.");
    } else {
      res.status(204).send(); // No Content
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user.");
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

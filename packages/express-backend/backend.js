import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) =>
  users["users_list"].filter((user) => user["name"] === name);

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUsersByNameAndJob = (name, job) =>
  users["users_list"].filter(
    (u) => u["name"] === name && u["job"] === job
  );

const deleteUserById = (id) => {
  const idx = users["users_list"].findIndex((u) => u["id"] === id);
  if (idx === -1) return false;
  users["users_list"].splice(idx, 1);
  return true;
};


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name !== undefined && job !== undefined) {
    const result = { users_list: findUsersByNameAndJob(name, job) };
    res.send(result);
  } else if (name !== undefined) {
    const result = { users_list: findUserByName(name) };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const ok = deleteUserById(id);
  if (!ok) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send(); // No Content
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

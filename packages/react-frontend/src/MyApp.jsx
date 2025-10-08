import Table from "./Table";
import React, {useState, useEffect} from "react";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then(async (res) => {
    console.log("Post Status =", res.status);
    if (res.status !== 201) {
      const msg = await res.text().catch(() => "");
      throw new Error(`Expected 201, got ${res.status}. ${msg}`);
    }
    return res.json();
  });
}

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );

function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
    .then(async (res) => {
      if (res.status !== 204) {
        const msg = await res.text().catch(() => "");
        throw new Error(`Expected 204, got ${res.status}. ${msg}`);
      }
    
      setCharacters((prev) => prev.filter((c) => c.id !== id));
    })
    .catch((err) => {
      console.error("DELETE failed:", err);
      
    });
}

function updateList(person) { 
    postUser(person)
      .then((created) => { setCharacters((prev) => [...prev, created]); })
      .catch((error) => {
        console.log(error);
      alert("Create failed; table not updated.");
	})
}

return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp; 

const neo4j = require("../database/database-neo4j");

module.exports.getAll = async () => {
  try {
    const res = await neo4j.read("MATCH (n) RETURN n", null);
    const users = res.records.map((row) => {
      return row.get("n").properties;
    });
    return {
      length: users.length,
      users,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.add = async (user) => {
  try {
    const res = await neo4j.write(
      "CREATE (n:User { id: randomUUID(), username: $username, firstname: $firstname, lastname: $lastname}) RETURN n",
      {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      }
    );
    return res.records[0].get("n").properties;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.delete = async (id) => {
  try {
    const res = await neo4j.write("MATCH (n: User {id: $id}) DETACH DELETE n", {
      id,
    });

    if (res.records.length < 1) {
      throw new Error("User not found!");
    }

    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

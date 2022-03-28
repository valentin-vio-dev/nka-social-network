const neo4j = require("../database/database.neo4j");

module.exports.getAll = async () => {
  try {
    const res = await neo4j.read("MATCH (n:User) RETURN n", null);
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
    const exists = await userExists(user);
    if (exists) {
      throw new Error("User already exists!");
    }

    const res = await neo4j.write(
      "CREATE (n:User { id: randomUUID(), username: $username, firstname: $firstname, lastname: $lastname }) RETURN n",
      user
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

    if (!res.summary.updateStatistics._containsUpdates) {
      throw new Error("User not found!");
    }

    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const userExists = async (user) => {
  const exists = await neo4j.read(
    "MATCH (n:User { username: $username }) RETURN n",
    {
      username: user.username,
    }
  );

  if (exists.records.length > 0) {
    return true;
  }
  return false;
};

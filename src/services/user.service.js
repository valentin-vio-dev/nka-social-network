const neo4j = require("../database/database.neo4j");

module.exports.getAll = async () => {
  const res = await neo4j.read("MATCH (n:USER) RETURN n", null);
  const users = res.records.map((row) => {
    return row.get("n").properties;
  });

  return {
    length: users.length,
    users,
  };
};

module.exports.add = async (user) => {
  const exists = await userExistsByUsername(user);
  if (exists) {
    throw new Error("User already exists!");
  }

  const res = await neo4j.write(
    "CREATE (n:USER { id: randomUUID(), username: $username, firstname: $firstname, lastname: $lastname, birthDate: $birthDate }) RETURN n",
    user
  );
  return res.records[0].get("n").properties;
};

module.exports.delete = async (id) => {
  const res = await neo4j.write("MATCH (n: USER {id: $id}) DETACH DELETE n", {
    id,
  });

  if (!res.summary.updateStatistics._containsUpdates) {
    throw new Error("User not found!");
  }

  return null;
};

const userExistsByUsername = async (user) => {
  const exists = await neo4j.read(
    "MATCH (n:USER { username: $username }) RETURN n",
    {
      username: user.username,
    }
  );

  if (exists.records.length > 0) {
    return true;
  }
  return false;
};

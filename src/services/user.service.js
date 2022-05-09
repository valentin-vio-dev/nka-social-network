const neo4j = require("../database/database.neo4j");
const bcrypt = require("bcrypt");

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

module.exports.registrate = async (user) => {
  const exists = await userExistsByUsername(user);
  if (exists) {
    throw new Error("User already exists!");
  }

  const userCopy = Object.assign({}, user);
  userCopy.password = await bcrypt.hash(userCopy.password, 12);

  const res = await neo4j.write(
    "CREATE (n:USER { id: randomUUID(), username: $username, firstname: $firstname, lastname: $lastname, birthDate: $birthDate, password: $password }) RETURN n",
    userCopy
  );
  return res.records[0].get("n").properties;
};

module.exports.login = async (username, password) => {
  const exists = await userExistsByUsername({ username });
  if (!exists) {
    throw new Error("User does not exist!");
  }

  const userRes = await neo4j.read(
    "MATCH (n:USER { username: $username }) RETURN n",
    {
      username,
    }
  );

  const user = userRes.records.map((row) => {
    return row.get("n").properties;
  })[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Username or password does not match!");
  }

  return { message: "Logged in" };
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

module.exports.userExistsById = async function ({ id }) {
  const exists = await neo4j.read("MATCH (n:USER { id: $id }) RETURN n", {
    id,
  });

  if (exists.records.length > 0) {
    return true;
  }
  return false;
};

async function userExistsByUsername({ username }) {
  const exists = await neo4j.read(
    "MATCH (n:USER { username: $username }) RETURN n",
    {
      username,
    }
  );

  if (exists.records.length > 0) {
    return true;
  }
  return false;
}

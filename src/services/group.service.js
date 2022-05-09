const neo4j = require("../database/database.neo4j");
const userService = require("../services/user.service");

module.exports.getAll = async () => {
  const res = await neo4j.read("MATCH (n:GROUP) RETURN n", null);
  const groups = res.records.map((row) => {
    return row.get("n").properties;
  });

  return {
    length: groups.length,
    groups,
  };
};

module.exports.add = async (group) => {
  const exists = await groupExistsByName(group);
  if (exists) {
    throw new Error("Group already exists!");
  }

  const existsUser = await userService.userExistsById({ id: group.uid });
  if (!existsUser) {
    throw new Error("User does not exist!");
  }

  const res = await neo4j.write(
    "CREATE (n:GROUP { id: randomUUID(), name: $name, membersCount: $membersCount, uid: $uid }) RETURN n",
    group
  );
  return res.records[0].get("n").properties;
};

module.exports.delete = async (id) => {
  const res = await neo4j.write("MATCH (n: GROUP {id: $id}) DETACH DELETE n", {
    id,
  });

  if (!res.summary.updateStatistics._containsUpdates) {
    throw new Error("Group not found!");
  }

  return null;
};

const groupExistsByName = async ({ name }) => {
  const exists = await neo4j.read("MATCH (n:GROUP { name: $name }) RETURN n", {
    name,
  });

  if (exists.records.length > 0) {
    return true;
  }
  return false;
};

const neo4j = require("../database/database.neo4j");

module.exports.getAll = async () => {
  try {
    const res = await neo4j.read("MATCH (n:Group) RETURN n", null);
    const groups = res.records.map((row) => {
      return row.get("n").properties;
    });
    return {
      length: groups.length,
      groups,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.add = async (group) => {
  try {
    const exists = await groupExists(group);
    if (exists) {
      throw new Error("Group already exists!");
    }

    const res = await neo4j.write(
      "CREATE (n:Group { id: randomUUID(), name: $name, membersCount: $membersCount }) RETURN n",
      group
    );
    return res.records[0].get("n").properties;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports.delete = async (id) => {
  try {
    const res = await neo4j.write(
      "MATCH (n: Group {id: $id}) DETACH DELETE n",
      {
        id,
      }
    );

    console.log(res);
    if (!res.summary.updateStatistics._containsUpdates) {
      throw new Error("Group not found!");
    }

    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const groupExists = async (group) => {
  const exists = await neo4j.read("MATCH (n:Group { name: $name }) RETURN n", {
    name: group.name,
  });

  if (exists.records.length > 0) {
    return true;
  }
  return false;
};

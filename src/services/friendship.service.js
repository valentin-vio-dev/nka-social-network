const neo4j = require("../database/database.neo4j");

module.exports.add = async (friendship) => {
  const exists = await friendshipExists(friendship);
  if (exists) {
    throw new Error("Friendship already exists!");
  }

  const res = await neo4j.write(
    `MATCH (a:User), (b:User) WHERE a.id = $id AND b.id = $other CREATE (a)-[r: FRIEND]->(b) RETURN a, b`,
    {
      id: friendship.id,
      other: friendship.other,
    }
  );
  return res;
};

const friendshipExists = async (group) => {
  const exists = await neo4j.read("MATCH (n:Group { name: $name }) RETURN n", {
    id: friendship.id,
    other: friendship.other,
  });

  if (exists.records.length > 0) {
    return true;
  }
  return false;
};

const neo4j = require("../database/database.neo4j");

module.exports.add = async (friendship) => {
  const exists = await friendshipExists(friendship);
  if (exists) {
    throw new Error("Friendship already exists!");
  }

  const res = await neo4j.write(
    `MATCH (a:USER), (b:USER) WHERE a.id = $id AND b.id = $otherId CREATE (a)-[r: FRIEND_OF]->(b), (a)<-[: FRIEND_OF]-(b) RETURN r;`,
    {
      id: friendship.id,
      otherId: friendship.otherId,
    }
  );

  return res;
};

module.exports.delete = async (friendship) => {
  const exists = await friendshipExists(friendship);
  if (!exists) {
    throw new Error("Friendship not exists!");
  }

  const res = await neo4j.write(
    `MATCH (a:USER {id: $id})-[r: FRIEND_OF]-(b:USER {id: $otherId}) DETACH DELETE r;`,
    {
      id: friendship.id,
      otherId: friendship.otherId,
    }
  );

  return res;
};

const friendshipExists = async (friendship) => {
  const exists = await neo4j.read(
    "RETURN EXISTS( (:USER {id: $id})-[:FRIEND_OF]-(:USER {id: $otherId}) );",
    {
      id: friendship.id,
      otherId: friendship.otherId,
    }
  );

  return exists.records[0]._fields[0];
};

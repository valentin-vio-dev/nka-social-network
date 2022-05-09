const neo4j = require("../database/database.neo4j");
const userService = require("../services/user.service");

module.exports.add = async (post) => {
  const userExists = await userService.userExistsById({ id: post.uid });
  if (!userExists) {
    throw new Error("User does not exist!");
  }

  const res = await neo4j.write(
    "CREATE (n:POST { id: randomUUID(), text: $text, uid: $uid, date: $date }) RETURN n",
    { text: post.text, uid: post.uid, date: new Date(Date.now()).toISOString() }
  );
  return res.records[0].get("n").properties;
};

module.exports.delete = async (id) => {
  const exists = await postExistsById(id);
  if (!exists) {
    throw new Error("Post does not exist!");
  }

  await neo4j.write("MATCH (n: POST {id: $id}) DETACH DELETE n", {
    id,
  });

  return null;
};

module.exports.getAll = async () => {
  const res = await neo4j.read("MATCH (n:POST) RETURN n", null);
  const posts = res.records.map((row) => {
    return row.get("n").properties;
  });

  return {
    length: posts.length,
    posts,
  };
};

async function postExistsById(id) {
  const exists = await neo4j.read("MATCH (n:POST { id: $id }) RETURN n", {
    id,
  });

  if (exists.records.length > 0) {
    return true;
  }
  return false;
}

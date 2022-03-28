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
      "CREATE (n:User { id: randomUUID(), username: $usernameParam, firstname: $firstnameParam, lastname: $lastnameParam}) RETURN n",
      {
        usernameParam: user.username,
        firstnameParam: user.firstname,
        lastnameParam: user.lastname,
      }
    );
    console.log(res);
    return res.records[0].get("n").properties;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

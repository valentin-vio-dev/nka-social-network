const neo4j = require("neo4j-driver");

let driver = null;

const getDriver = () => {
  if (!driver) {
    driver = neo4j.driver(
      process.env.DATABASE_URI,
      neo4j.auth.basic(process.env.DATABASE_USER, process.env.DATABASE_PASSWORD)
    );
  }
  return driver;
};

module.exports = {
  read: (cypher, params = {}, database = process.env.DATABASE_NAME) => {
    const session = getDriver().session({
      defaultAccessMode: neo4j.session.READ,
      database,
    });

    return session
      .run(cypher, params)
      .then((res) => {
        session.close();
        return res;
      })
      .catch((e) => {
        session.close();
        throw e;
      });
  },
  write: (cypher, params = {}, database = process.env.DATABASE_NAME) => {
    const session = getDriver().session({
      defaultAccessMode: neo4j.session.WRITE,
      database,
    });

    return session
      .run(cypher, params)
      .then((res) => {
        session.close();
        return res;
      })
      .catch((e) => {
        session.close();
        throw e;
      });
  },
};

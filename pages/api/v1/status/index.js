import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dataBaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = dataBaseVersionResult.rows[0].server_version;

  const dataBaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const dataBaseConnectionsValue =
    dataBaseMaxConnectionsResult.rows[0].max_connections;

  const dataBaseName = process.env.POSTGRES_DB;
  const dataBaseconnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname= $1;",
    values: [dataBaseName],
  });
  const dataBaseOpenedConnectionsValue =
    dataBaseconnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    Dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(dataBaseConnectionsValue),
        opened_connections: dataBaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;

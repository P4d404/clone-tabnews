import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dataBaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = dataBaseVersionResult.rows[0].server_version;

  response.status(200).json({
    updated_at: updatedAt,
    Dependencies: {
      database: {
        version: databaseVersionValue,
      },
    },
  });
}

export default status;

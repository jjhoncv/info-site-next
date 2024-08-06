// lib/db.ts
import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export async function executeQuery<T>({
  query,
  values,
}: {
  query: string;
  values?: any[];
}): Promise<T> {
  try {
    const results = await db.query<T>(query, values);
    await db.end();
    return results;
  } catch (error) {
    throw error;
  }
}

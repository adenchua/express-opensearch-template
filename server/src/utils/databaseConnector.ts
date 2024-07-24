import { Client } from "@opensearch-project/opensearch";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const OPENSEARCH_URI = process.env.OPENSEARCH_URI || "http://localhost:9200";
const OPENSEARCH_USERNAME = process.env.OPENSEARCH_USERNAME || "";
const OPENSEARCH_PASSWORD = process.env.OPENSEARCH_PASSWORD || "";

class DatabaseConnector {
  #client: Client | null = null;

  constructor() {
    const client = new Client({
      node: OPENSEARCH_URI,
      auth: {
        username: OPENSEARCH_USERNAME,
        password: OPENSEARCH_PASSWORD,
      },
      ssl: {
        rejectUnauthorized: false,
      },
    });

    this.#client = client;
  }

  async isConnected(): Promise<boolean> {
    if (this.#client == null) {
      return false;
    }

    const status = await this.#client.ping();

    return status.statusCode === 200;
  }

  getClient(): Client {
    return this.#client!;
  }
}

const databaseConnector = new DatabaseConnector();

export default databaseConnector;

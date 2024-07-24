import databaseConnector from "../utils/databaseConnector";

const databaseClient = databaseConnector.getClient();

export async function createPerson(name: string): Promise<unknown> {
  const response = await databaseClient.index({
    index: "person",
    body: {
      name,
    },

    refresh: true,
  });

  return response;
}

export async function fetchPersons(): Promise<unknown> {
  const response = await databaseClient.search({
    index: "person",
    body: {
      query: {
        match_all: {},
      },
    },
  });

  return response;
}

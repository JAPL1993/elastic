import { Client } from "@elastic/elasticsearch";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "HqsOSC253=ogD0uSegOw",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

AppDataSource.initialize()
  .then(async () => {
    const { hits } = await client.search({
      index: "seller_users",
      body: {
        query: {
          multi_match: {
            query: "faride",
            fields: ["name", "last_name", "email", "id"],
          },
        },
      },
    });
    console.log(hits);
  })
  .catch((error) => console.log(error));

async function createIndex() {
  await client.indices.create({
    index: "seller_users",
    body: {
      mappings: {
        properties: {
          id: { type: "text" },
          name: { type: "text" },
          last_name: { type: "text" },
          email: { type: "text" },
        },
      },
    },
  });
}

async function saveData(data: any) {
  await client.index({
    index: "seller_users",
    body: {
      id: data.id,
      name: data.name,
      last_name: data.last_name,
      email: data.email,
    },
  });
}

async function getData() {
  const { hits } = await client.search({
    index: "prueba_products",
    body: {
      query: {
        multi_match: {
          query: "laptop",
          fields: ["nombre", "descripcion"],
        },
      },
    },
  });
  console.log(hits.hits);
}

const { PineconeClient } = require("@pinecone-database/pinecone");

const final = async () => {
  const pinecone = new PineconeClient();

  const response1 = await pinecone.init({
    api_key:"dc92a7bf-d8ac-4698-a424-a7b73b88a9c2",
    environment:"us-east1-gcp"
  });
  console.log(await response1)

  const reponse2 = await pinecone.createIndex({
    createRequest: {
      name: "example-index",
      dimension: 1024,
    },
  });
  console.log(await response2)

  const indexesList = await pinecone.listIndexes();
}

final()


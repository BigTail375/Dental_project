import pinecone
pinecone.init(
      api_key="dc92a7bf-d8ac-4698-a424-a7b73b88a9c2",
      environment="us-east1-gcp"
   )

print(pinecone.list_indexes())
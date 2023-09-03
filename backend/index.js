const fetch = require("node-fetch");
const cheerio = require("cheerio");
const API_KEY = "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";
const express = require("express");
const cors = require("cors");

const pc = require("@pinecone-database/pinecone");

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;

let questions = [];
let answers = [];

app.post("/asked", async (req, res) => {
  // const url = req.body.urlInput;

  // const getContentFromUrl = async (url) => {
  //   const res = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "User-Agent":
  //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  //     },
  //   });

  //   const $ = cheerio.load(await res.text());

  //   const content = $("p").text();

  //   return {
  //     href: url,
  //     content: content.split("."),
  //   };
  // };

  // const content = await getContentFromUrl(url);

  // const webparser = content.content;

  // const web_result = webparser.toString();

  // console.log("hello");

  // console.log(web_result);

  // const query = `
  //   please generator the possible 20 questions and answers
  // `;
  
  // const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + String(API_KEY),
  //   },
  //   body: JSON.stringify({
  //     model: "gpt-3.5-turbo",
  //     temperature: 0.1,
  //     messages: [
  //       {
  //         role: "system",
  //         content: query,
  //       },
  //       {
  //         role: "user",
  //         content: web_result,
  //       },
  //     ],
  //     max_tokens: 2048,
  //   }),
  // });

  // const data = await response.json();

  // const q_a = data.choices[0].message.content;

  // const result = q_a
  //   .toString()
  //   .split("\n")
  //   .filter((str) => str != "");

  // questions = result.filter((item, idx) => idx % 2 === 0);

  // answers = result.filter((item, idx) => idx % 2 === 1);

  // const response_embedding = await fetch(
  //   "https://api.openai.com/v1/embeddings",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + String(API_KEY),
  //     },
  //     body: JSON.stringify({
  //       model: "text-embedding-ada-002",
  //       input: questions,
  //     }),
  //   }
  // );

  // const embedding_data = (await response_embedding.json()).data.map(
  //   (item) => item.embedding
  // );

  // const vectors = answers.map((answer, i) => {
  //   return {
  //     id: answer,
  //     metadata: {
  //       name: answer
  //     },
  //     values: embedding_data[i]
  //   }
  // })

  console.log("Here")

  const pinecone = new pc.PineconeClient();
  await pinecone.init({
    environment: "us-east1-gcp",
    apiKey: "dc92a7bf-d8ac-4698-a424-a7b73b88a9c2",
  });

  const indexesList = await pinecone.listIndexes();
  console.log(indexesList)
  // res.send(JSON.stringify({ messages: data.choices }));
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));

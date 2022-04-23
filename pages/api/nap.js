import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://pavel:10j6lOmIAqoNYQtP@cluster0.79r78.mongodb.net/SleepDiary?retryWrites=true&w=majority"
  );
  const db = client.db();
  const napsCollection = db.collection("naps");

  // Get all naps
  if (req.method === "GET") {
    const naps = await napsCollection.find().toArray();
    res.status(200).json(naps);
  }

  // Add new nap
  if (req.method === "POST") {
    const data = req.body;
    const response = await napsCollection.insertOne(data);
    return res.status(200).json(response);
  }

  // Finish the nap
  if (req.method === "PUT") {
    const data = req.body;
    const response = await napsCollection.findOneAndUpdate(
      { start: data.start },
      { $set: data.params },
      { new: true }
    );
    return res.status(200).json(response);
  }

  client.close();
}

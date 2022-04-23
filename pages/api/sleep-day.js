import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(
    `mongodb+srv://pavel:${process.env.NEXT_PUBLIC_MONGO_PSWD}@cluster0.79r78.mongodb.net/SleepDiary?retryWrites=true&w=majority`
  );
  const db = client.db();

  // Get all days
  if (req.method === "GET") {
    const daysCollection = db.collection("days");
    const days = await daysCollection.find().toArray();
    res.status(200).json(days);
  }

  // Add new day
  if (req.method === "POST") {
    const daysCollection = db.collection("days");
    const data = req.body;
    const response = await daysCollection.insertOne(data);
    return res.status(200).json(response);
  }

  client.close();
}

import mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
  date: {
    type: BigInt,
    required: [true, "Please, provide a date"],
  },
});

export default mongoose.models.Day || mongoose.model("Day", DaySchema);

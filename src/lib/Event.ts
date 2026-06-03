// src/models/Event.ts
// Mongoose schema for the Event model.
import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  hostId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String },
}, { timestamps: true });

export default models.Event || model("Event", EventSchema);
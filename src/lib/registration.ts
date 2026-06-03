import mongoose, { Schema, model, models } from "mongoose";

const RegistrationSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  registeredAt: { type: Date, default: Date.now },
});

RegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });
export default models.Registration || model("Registration", RegistrationSchema);
import { Schema, model, models } from "mongoose";

const RhythmSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  linkUrl: {
    type: String,
    required: [true, "Link is required."],
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  isShared: {
    type: Boolean,
    default: true,
  },
});

const Rhythm = models.Rhythm || model("Rhythm", RhythmSchema);

export default Rhythm;

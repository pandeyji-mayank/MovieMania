import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    movieDetails: {
        type: Object,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);

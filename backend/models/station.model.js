import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
    name: String,
    location: {
        lat: Number,
        long: Number
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    powerOutput: Number,
    connectorType: String,
}, { timestamps: true });

const Station = mongoose.model("Station", stationSchema);
export default Station;
import mongoose from "mongoose"



const newsSchema= new mongoose.Schema ({
    title: { type: String, required: true },
    text: { type: String, required: true },
    images: [{ type: String }], // Cloudinary URLs
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    postedBy: { type: mongoose.Schema.Types.ObjectId,  required:true, ref: "Admin",  }, //

})

const newsModel = mongoose.model('News', newsSchema)

export {newsModel as News}

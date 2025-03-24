import { uploadToCloudinary } from "../utilis/cloudinary.js";
import { News } from "../models/News.js";

// Get paginated News
export const getNews = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  console.log("Incoming request to fetch paginated news");
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    

    console.log("News fetch successfully", news)
    res.status(201).json({ message: "News fetch successfully", news: news });
  } catch (error) {
    console.log("Error fetching paginated news", error)
    res.status(500).json({ error: "Server error" });
  }
};

// Get news by ID
export const getnewsID = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    news.views += 1;
    await news.save();
    res.json(news);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" });
  }
};

// Get news by Tag
export const getnewsTag = async (req, res) => {
  try {
    const news = await News.find({ tags: req.params.tag });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};



export const createNews = async (req, res) => {
  try {
    const { title, text, tags, image } = req.body;
    console.log("Received Data:", req.body);

    const userId = req.user.userId // user Id from authentication middleware

    console.log("user Id:", userId)

    if (!image) return res.status(400).json({ error: "No image provided" });

    const uploadedImage = await uploadToCloudinary(image);
    const news = new News({ title, text, tags, postedBy:userId, images: [uploadedImage] });

    await news.save();
    console.log("News created successfully...", news);

    res.status(201).json(news);
  } catch (error) {
    console.error("Error creating news:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Like News
export const likeNews = async (req, res) => {
  try {
    console.log("Incoming data", req.params.id)
    // const news = await News.findById(req.params.id);
    // if (!news) return res.status(404).json({ error: "News not found" });
    // news.likes += 1;
    // await news.save();
    // res.json({ likes: news.likes });

    const { id } = req.params;
    const { action } = req.body; // "like" or "unlike"
    const news = await News.findById(id);
    
    if (!news) return res.status(404).json({ error: "News not found" });
  
    if (action === "like") {
      news.likes += 1;
    } else if (action === "unlike") {
      news.likes = Math.max(0, news.likes - 1); // Prevent negative likes
    }
  
    await news.save();
    res.json({ likes: news.likes });
  } catch (err) {
    console.log("Error liking/unliking", err)
    res.status(500).json({ error: "Server error" });
  }
};

// delete News
export const deleteNews = async (req, res) => {
  console.log("Incommign request to delte item")

  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) return res.status(404).json({ error: "News not found" });

    console.log("Delete successful")


    res.json({ message: "News deleted successfully" });
  } catch (err) {
    console.log("Error deleting items", err)
    res.status(500).json({ error: "Server error" });
  }
};

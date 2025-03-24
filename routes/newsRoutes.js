import express from "express";
import { getNews, getnewsID, createNews, deleteNews, getnewsTag, likeNews } from "../controller/newsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

// const upload = multer({storage: multer.memoryStorage()});

router.get('/:id', getnewsID)


router.get('/', getNews)


router.post('/newsTag', getnewsTag)

router.post('/', authMiddleware,  createNews)

router.post('/:id/like', likeNews )

router.delete('/:id',  deleteNews)


export default router
import express from "express";
import { getAllPodcasts, getPodcastsById } from "../controllers/podcastsController.js";

const router = express.Router();

router.get("/", getAllPodcasts);
router.get("/:id", getPodcastsById);

export default router;
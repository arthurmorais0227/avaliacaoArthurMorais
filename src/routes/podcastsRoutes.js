import express from "express";
import { createPodcast, getAllPodcasts, getPodcastsById } from "../controllers/podcastsController.js";

const router = express.Router();

router.get("/", getAllPodcasts);
router.get("/:id", getPodcastsById);
router.post("/", createPodcast)

export default router;
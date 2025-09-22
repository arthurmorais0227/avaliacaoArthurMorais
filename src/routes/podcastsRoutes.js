import express from "express";
import { createPodcast, deletePodcast, getAllPodcasts, getPodcastsById } from "../controllers/podcastsController.js";

const router = express.Router();

router.get("/", getAllPodcasts);
router.get("/:id", getPodcastsById);
router.post("/", createPodcast);
router.delete("/:id", deletePodcast);

export default router;
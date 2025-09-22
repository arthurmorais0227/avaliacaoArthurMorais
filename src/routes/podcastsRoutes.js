import express from "express";
import { getAllPodcasts } from "../controllers/podcastsController.js";

const router = express.Router();

router.get("/", getAllPodcasts);

export default router;
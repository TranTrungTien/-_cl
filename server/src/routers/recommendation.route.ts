import express from "express";
import RecommendationController from "../controllers/recommendation.controller";

const router = express.Router();

router.get("/new", RecommendationController.getRecommendationDef);
router.get("/related", RecommendationController.getRecommendationFromVideo);
router.get("/search", RecommendationController.getSearchRecommended);

export default router;

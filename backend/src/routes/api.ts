import { Router } from "express";
import { explore, liked, search, suggested } from "../controllers/api";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/explore", explore);
router.get("/search", search);
router.get("/suggested", suggested);
router.get("/liked", authenticate, liked);

export default router;

import { Router } from "express";
import { DELETE, GET, POST, PUT } from "./user";


const router = Router()

router.get("/users/get", GET)
router.post("/users/post", POST)
router.put("/users/put/:id", PUT)
router.delete("/users/delete/:id", DELETE)

export default router
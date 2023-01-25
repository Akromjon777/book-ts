import { Router } from "express";
import { DELETE, GET, POST, PUT } from "./book";


const router = Router()


router.get("/book/get", GET)
router.post("/book/post", POST)
router.put("/book/put", PUT)
router.delete("/book/delete", DELETE)

export default router






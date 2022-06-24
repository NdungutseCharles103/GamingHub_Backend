import { Router } from "express";
import postController from "../controllers/postController";

class PostRouter {
    private _router = Router();
    private _controller = postController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get("/", this._controller.getAll);
        this._router.get("/:id", this._controller.getById);
        this._router.post("/newPost", this._controller.create);
        this._router.put("/:id", this._controller.update);
        this._router.delete("/:id", this._controller.delete);
        this._router.get("/user/:id", this._controller.getByUser);
    }
}
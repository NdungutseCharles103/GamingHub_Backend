import { Router } from "express";
import postController from "../controllers/postController";
import authorization from "../middlewares/authorization";

class PostRouter {
    private _router = Router();
    private _controller = postController;
    private _auth = authorization.verifyToken;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get("/", this._auth, this._controller.getAll);
        this._router.get("/:id", this._auth, this._controller.getById);
        this._router.post("/newPost", this._auth, this._controller.create);
        this._router.put("/:id", this._auth, this._controller.update);
        this._router.delete("/:id", this._auth, this._controller.delete);
        this._router.get("/user/:id", this._auth, this._controller.getByUser);
    }
}

export default new PostRouter().router;
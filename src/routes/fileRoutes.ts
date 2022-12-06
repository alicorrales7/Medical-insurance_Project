import { Application, Request, Response } from "express";
import express from "express";
import Container from "typedi";
import { FileController } from "../controllers/fileController";
import { logger } from "../util/logger";


export const fileRoute = (app: Application): void => {
    app.use(express.json());

    const fileControllers = Container.get(FileController)

    app.get("/file", (req: Request, res: Response) => {
        const logRoute = logger.info("Route file to access")
        const file = fileControllers.getFile(res)
    })
}
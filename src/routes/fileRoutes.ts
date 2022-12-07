import express, { Application, Request, Response } from "express";
import Container from "typedi";

import { FileController } from "../controllers/fileController";
import { logger } from "../util/logger";

export const fileRoute = (app: Application): void => {
  app.use(express.json());

  const fileControllers = Container.get(FileController);

  app.post("/sherpa", (req: Request, res: Response) => {
    logger.info("Route file to access");
    fileControllers.postSherpa(res,req);
  });

  app.post("/ambetterBOB", (req: Request, res: Response) => {
    logger.info("Route file to access");
    fileControllers.postAmbetterBOB(res,req);
  });

  app.post("/ambetterComm", (req: Request, res: Response) => {
    logger.info("Route file to access");
    fileControllers.postAmbetterCommiss(res,req);
  });
};

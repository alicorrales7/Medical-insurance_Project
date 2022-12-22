import express, { Application, Request, Response } from "express";
import multer from "multer";
import Container from "typedi";

import { FileController } from "../controllers/fileController";

export const fileRoute = (app: Application): void => {
  app.use(express.json());

  const fileControllers = Container.get(FileController);
  const upload = multer({ dest: "uploads/" });
  const multipleUploads = upload.fields([
    { name: "sherpa" },
    { name: "companyBOB" },
    { name: "companyComm" },
  ]);

  app.post("/sherpa/:name", multipleUploads, (req: Request, res: Response) => {
    fileControllers.filesReport(res, req);
  });
};

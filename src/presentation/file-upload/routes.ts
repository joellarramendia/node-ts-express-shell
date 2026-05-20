import { Router } from 'express';
import { FileUploadController } from './controller.js';
import { FileUploadService } from '../services/file-upload.service.js';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware.js';
import { TypeMiddleware } from '../middlewares/type.middleware.js';


export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController(new FileUploadService())
    
    router.use(FileUploadMiddleware.containFiles)
    // router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']))
    // Definir las rutas
    router.post('/single/:type', controller.uploadFile);
    router.post('/multiple/:type', controller.uploadMultipleFiles);


    return router;
  }


}


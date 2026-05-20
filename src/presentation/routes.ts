import { Router } from 'express';
import { AuthRoutes } from './auth/routes.js';
import { CategoryRoutes } from './category/routes.js';
import { ProductRoutes } from './products/routes.js';
import { FileUploadRoutes } from './file-upload/routes.js';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/categories', CategoryRoutes.routes );
    router.use('/api/products', ProductRoutes.routes );
    router.use('/api/upload', FileUploadRoutes.routes );



    return router;
  }


}


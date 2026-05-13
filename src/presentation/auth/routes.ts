import { Router } from 'express';
import { envs } from '../../config/envs.js';
import { AuthController } from './controller.js';
import { AuthService, EmailService } from '../services/index.js';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    )
    
    const authService = new AuthService(emailService)

    const controller = new AuthController(authService)
    
    // Definir las rutas
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );

    router.get('/validate-email/:token', controller.validateEmail );





    return router;
  }


}


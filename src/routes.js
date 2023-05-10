import { Router } from 'express';
import SessionController from './controllers/SessionController'
import HouseController from "./controllers/HouseController";
import multer from 'multer';
import uploadConfig from './config/uploadConfig';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
//single para enviar uma img para 'var'
routes.post('/house', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/house/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/house', HouseController.delete);

export default routes;
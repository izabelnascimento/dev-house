import { Router } from 'express';
import SessionController from './controllers/SessionController'
import HouseController from "./controllers/HouseController";
import multer from 'multer';
import uploadConfig from './config/uploadConfig';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
//single para enviar uma img para 'var'
routes.post('/house', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/house/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/house', HouseController.delete);

routes.get('/dashboard', DashboardController.getAllHouses);

routes.post('/houses/:house_id/reserve', ReserveController.create);
routes.get('/reserves', ReserveController.getAll);
routes.delete('/reserve/cancel', ReserveController.delete);

export default routes;
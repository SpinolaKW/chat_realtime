import { Router, request, response, Request, Response } from 'express';
import { getUsers } from './controller/UserController';
import { getUser } from './controller/UserController';
import { saveUser } from './controller/UserController';
import { getRoom } from './controller/RoomController';
import { getRooms } from './controller/RoomController';
import { saveRoom } from './controller/RoomController';

const routes = Router();

routes.get('/home', (request: Request, response: Response) => {
    return response.json({ message: 'Teste Back e Banco! Sucesso' })
})

//usuario
routes.get('/users', getUsers)
routes.get('/user/:id', getUser)
routes.post('/user/:id', saveUser)

//sala e mensagem
routes.get('/rooms', getRooms)
routes.get('/room/:id', getRoom)
routes.post('/room/:id', saveRoom)

export default routes;
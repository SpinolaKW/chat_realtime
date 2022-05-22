import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Room } from "../entity/room";

//puxa todos os usuarios
export const getRooms = async(request: Request, response: Response) => 
{
    const users = await getRepository(Room).find()
    return response.json(users);
}

//pegando somente um usuario
export const getRoom = async(request: Request, response: Response) => 
{
    const {id} = request.params
    const user = await getRepository(Room).findOne(id)
    return response.json(user);
}

//salvando os usuarios
export const saveRoom = async(request: Request, response: Response) => 
{
    const userSave = await getRepository(Room).save(request.body)
    return response.json(userSave);
}
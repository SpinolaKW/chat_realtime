import { getRepository } from "typeorm";
import {NextFunction, Request, Response} from "express";
import {UserPerson} from "../entity/user";

//puxa todos os usuarios
export const getUsers = async(request: Request, response: Response) => 
{
    const users = await getRepository(UserPerson).find()
    return response.json(users);
}

//pegando somente um usuario
export const getUser = async(request: Request, response: Response) => 
{
    const {id} = request.params
    const user = await getRepository(UserPerson).findOne(id)
    return response.json(user);
}

//salvando os usuarios
export const saveUser = async(request: Request, response: Response) => 
{
    const userSave = await getRepository(UserPerson).save(request.body)
    return response.json(userSave);
}
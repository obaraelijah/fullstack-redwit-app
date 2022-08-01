import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import {Request, Response, } from 'express';
import { Session } from "express-session";

export type Mycontext = {
     em: EntityManager<any>  & EntityManager<IDatabaseDriver<Connection>>
     req: Request & {session:Session} 
     res: Response;
}


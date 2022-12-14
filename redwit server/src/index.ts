import "reflect-metadata";
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants';
import microConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/sam"
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/User";
import { Mycontext } from "./types";
import session from "express-session";
import * as redis from 'redis';
import cors from 'cors'



declare module "express-session"{
  interface Session {
    userId:number
  }
}

const main = async () => {
    const orm = await MikroORM.init(microConfig); //connects to db
    await orm.getMigrator().up(); //run migration
   
  const app = express();
  
 const RedisStore = require('connect-redis')(session)
 const redisClient = redis.createClient()
 await redisClient.connect();
 
 app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
 }))
 app.use(
  session({
    name: "qid",
    store: new RedisStore({ client: redisClient,
    disableTouch: true,

    }),
    cookie: {
      maxAge: 1000 * 60 * 24 * 365 * 10 ,// 10years
      httpOnly: true,
      sameSite: "lax" ,// csrf
      secure: __prod__ , //cookie only works in tttps
    },
    saveUninitialized: false,
    secret: 'keyboard cat',
    resave: false,
  })
)


    const apolloserver = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver, UserResolver],
        validate: false
      }),
      context: ({ req, res}): Mycontext => <Mycontext > ({em: orm.em, req, res})
    });

    await apolloserver.start();
    apolloserver.applyMiddleware({ app, 
      cors: false, 
      path: "/api",

    });

    app.listen(4000, () => {
      console.log('server started on localhost:4000');
    })
  };


main().catch((err) => {
    console.error(err)
});
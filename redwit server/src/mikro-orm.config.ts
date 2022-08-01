import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"
import path from "path";
import { User } from "./entities/User";


export default{
    migrations: {
      path: path.join(__dirname, "./migrations"),
      patterns: /^[\w]+\d+\.[tj]s$/,
    },
        entities: [Post, User],
        dbName: 'elijah',
        user: 'elijah',
        password:'elijah',
        type: 'postgresql',
          debug: !__prod__,
    } as Parameters<typeof MikroORM.init>[0];


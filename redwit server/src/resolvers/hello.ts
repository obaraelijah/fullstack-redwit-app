import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
   @Query(() => String)
   hell0() {
    return "bye"
   }
}
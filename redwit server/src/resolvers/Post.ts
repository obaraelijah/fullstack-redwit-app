import { Post } from "../entities/Post";
import { Mycontext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { RequiredEntityData } from "@mikro-orm/core";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() {em}: Mycontext ): Promise<Post[]> {
     return em.find(Post, {});
    }

    @Query(() => Post, {nullable: true})
   post(
    @Arg("id") id: number,
    @Ctx() {em}: Mycontext ): Promise<Post | null> {
    return em.findOne(Post, {id});
   }
//create post
   @Mutation(() => Post)
   async createPost(
    @Arg("title") title: string,
    @Ctx() {em}: Mycontext ): Promise<Post> {
        const post = em.create(Post, { title } as RequiredEntityData<Post>);
       await em.persistAndFlush(post);
    return post;
   }

   //updating post
   @Mutation(() => Post, {nullable: true})
   async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, {nullable: true}) title: string,
    @Ctx() {em}: Mycontext ): Promise<Post | null> {
        const post = await em.findOne(Post, {id});
        if (!post) {
            return null
        }
        if (typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post);
        }
    return post;
   }
// deleting posts
   @Mutation(() => Boolean)
   async deletePost(
    @Arg("id") id: number,
    @Ctx() {em}: Mycontext ): Promise<boolean> {
       await em.nativeDelete(Post, {id});
    return true;
   }

}
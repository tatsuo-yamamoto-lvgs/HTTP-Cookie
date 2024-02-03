import { createPostModel, fetchAllPostModel } from "../model/postModel";

export class postService {
  constructor() {}

  async createPostService(userId: number, body: string): Promise<void> {
    try {
      const decodedBody = decodeURIComponent(body.replace(/\+/g, " "));
      const posts = await createPostModel(userId, decodedBody);
    } catch (error) {
      console.log("データベースエラー");
      throw new Error();
    }
  }
  async fetchAllPostsService(): Promise<PostData[]> {
    try {
      const allPosts = await fetchAllPostModel();
      const displayPosts = allPosts.map((post) => {
        return {
          userId: post.user_id,
          body: post.body,
          createdAt: post.created_at,
        };
      });
      return displayPosts;
    } catch (error) {
      console.log("データベースエラー");
      throw new Error();
    }
  }
}

type PostData = {
  userId: number;
  body: string;
  createdAt: Date;
};

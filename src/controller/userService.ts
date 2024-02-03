import { getUserNameModel } from "../model/userModel";

export class userService {
  constructor() {}

  async getUserData(userId: number): Promise<string> {
    try {
      const userName = await getUserNameModel(userId);
      return userName;
    } catch (error) {
      console.log("データベースエラー");
      throw new Error();
    }
  }
}

// type userData = {
//   id: number;
//   name: string;
//   posts: string;
// };

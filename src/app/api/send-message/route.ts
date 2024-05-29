import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";
import { Message } from "@/models/User.models";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          message: "User is not accepting the messages",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      {
        message: "Message sent successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Error adding messages!",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

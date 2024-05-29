import UserModel from "@/models/User.models";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        message: "Not authenticated!",
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const userId = user?._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return Response.json(
        {
          message: "Failed to update user status to accept messages",
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        message: "Message acceptance status update successfully",
        updatedUser,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update user status to accept messages",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        message: "Not Authenticated!",
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const userId = user?._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          message: "User not found!",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        isAcceptingMessages: foundUser.isAcceptingMessage,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Error in getting message acceptance messages ",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

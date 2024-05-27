import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.models";


export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
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

    const isCodeValid= user.verifyCode===code
    const isCodeNotExpired = new Date(user.verifyCodeExpiry)>new Date()

    if(isCodeValid && isCodeNotExpired){
        user.isVerified=true
        await user.save()

        return Response.json(
          {
            message: "User verified succcessfully!",
            success: true,
          },
          {
            status: 200,
          }
        );
    }else if(!isCodeValid){
        return Response.json(
          {
            message: "Verification Code isn't valid",
            success: false,
          },
          {
            status: 400,
          }
        );
    }else{
        return Response.json(
          {
            message: "Verification Code has expired please sign-up again to get a new code!",
            success: false,
          },
          {
            status: 400,
          }
        );
    }


  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        message: "Error verifying user",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

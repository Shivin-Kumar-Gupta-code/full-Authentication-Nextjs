import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    //check if the user exist or not
    if (!user) {
      return NextResponse.json(
        { message: "User Not Found !" },
        { status: 400 }
      );
    }
    // send the Resend email
    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({
      message: "Reset Pssword Email Sent Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

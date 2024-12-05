import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "Unauthorised",
        },
        { status: 403 }
      );
    }

    const authorId = req.nextUrl.searchParams.get("authorId");
    const authorIdInt: number = Number(
      req.nextUrl.searchParams.get("authorId")
    );
    if (authorId === null) {
      const users = await prisma.user.findMany();
      return NextResponse.json({ data: users }, { status: 200 });
    }

    const users = await prisma.user.findMany({
      where: {
        id: authorIdInt,
      },
    });
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("User created");

    return NextResponse.json({
      message: "User created successfully",
      user: { email: newUser.email },
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
};

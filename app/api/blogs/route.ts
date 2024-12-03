import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import constructQueryConditions from "./utils";
import checkAuth from "../middlewares/middlewares";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

type paramtype = {
  params: {
    id: number;
  };
};

export const GET = async (req: NextRequest, { params }: paramtype) => {
  try {
    const authResponse = await checkAuth();
    if (authResponse) {
      return authResponse;
    }

    if (params == null) {
      const blogs = await prisma.blog.findMany();
      return NextResponse.json({ data: blogs }, { status: 200 });
    }

    let queryConditions: Record<string, any> = constructQueryConditions(params);
    const blogs = await prisma.blog.findMany({
      where: queryConditions,
    });
    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (err: any) {
    console.error("Error during signup:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession();
    const { title, thumbnail, content } = await req.json();
    const blog = {
      title: title,
      thumbnail: thumbnail,
      content: content,
      authorId: session?.user,
    };

    const newBlog = await prisma.blog.create({
      data: blog,
    });

    return NextResponse.json(
      {
        message: "Blog created",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {};

export const DELETE = async (req: NextRequest, res: NextResponse) => {};

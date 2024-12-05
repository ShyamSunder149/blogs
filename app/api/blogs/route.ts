import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import constructQueryConditions from "./utils";
import checkAuth from "../middlewares/middlewares";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";

const prisma = new PrismaClient();

type paramtype = {
  params: {
    id: number;
  };
};

export const GET = async (req: NextRequest, { params }: paramtype) => {
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

    if (params == null) {
      const blogs = await prisma.blog.findMany();
      return NextResponse.json({ data: blogs }, { status: 200 });
    }

    console.log(params);

    let queryConditions: Record<string, any> = constructQueryConditions(params);
    console.log(queryConditions);
    const blogs = await prisma.blog.findMany({
      where: queryConditions,
    });
    console.log(blogs);
    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
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

    console.log(session);

    const { title, thumbnail, content } = await req.json();
    const blog = {
      title: title,
      thumbnail: thumbnail,
      content: content,
      authorId: Number(session?.user?.id),
    };

    console.log(blog);

    const newBlog = await prisma.blog.create({
      data: blog,
    });

    console.log(newBlog);

    return NextResponse.json(
      {
        message: "Blog created",
      },
      { status: 200 }
    );
  } catch (err : any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {};

export const DELETE = async (req: NextRequest, res: NextResponse) => {};

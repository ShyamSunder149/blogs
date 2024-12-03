import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export default function checkAuth() {
    const session = getServerSession();
    if (session === null) {
      return NextResponse.json({ message: "Unauthorised" }, { status: 403 });
    }
    return NextResponse.next();
}
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json({ res: "Hello, World!" }, { status: 201 });
}

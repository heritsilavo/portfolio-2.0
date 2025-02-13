import { ProposerLivre } from "@/models/proposer-livre";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(new ProposerLivre(), { status: 201 });
}

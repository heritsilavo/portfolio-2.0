import { prisma } from "@/lib/prisma";
import { defaultProposerLivre } from "@/models/proposer-livre";
import { ProposerLivre } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Convertir le corps de la requête en chaîne de caractères
    const bodyText = await request.text();
    // Parser la chaîne de caractères en JSON
    const body: ProposerLivre = JSON.parse(bodyText);
    
    // Créer un nouveau livre dans la base de données
    const result = await prisma.proposerLivre.create({ data: body });
    
    // Retourner la réponse JSON
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur lors de la création du livre :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
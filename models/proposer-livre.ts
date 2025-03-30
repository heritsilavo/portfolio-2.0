import { z } from "zod";

export const ProposerLivreSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  nom: z.string().min(1),
  contact: z.string().min(1),
});

export type ProposerLivre = z.infer<typeof ProposerLivreSchema>;
export const defaultProposerLivre = {contact:"",description: "", nom: "", title: ""}
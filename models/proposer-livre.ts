export class ProposerLivre {
    title: string;
    description: string;
    nom?: string;
    contact?: string;
  
    constructor(data?: { description: string; title: string, nom: string, contact: string}) {
      this.title = data?.title || "";
      this.description = data?.description || "";
      this.nom = data?.nom || "";
      this.contact = data?.contact || "";
    }
  }
  
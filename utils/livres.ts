import { Livre } from "@/models/livre";

export function getReadedBooks():Livre[] {
    return [
        {
            imgUrl:"/livres/patron-de-conception.png",
            title:"patron de conception"
        },
        {
            imgUrl:"/livres/refactoring-ui.png",
            title:"Refactoring UI"
        },
        {
            imgUrl:"/livres/clean-code.png",
            title:"Clean Code"
        },
        {
            imgUrl:"/livres/proposer.svg",
            title:"Proposer un livre"
        },
        
    ]
}
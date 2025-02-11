import { Livre } from "@/models/livre";

export function getReadedBooks():Livre[] {
    return [
        {
            imgUrl:"/livres/patron-de-conception.png",
            title:"patron de conception",
            type: "LIVRE"
        },
        {
            imgUrl:"/livres/refactoring-ui.png",
            title:"Refactoring UI",
            type: "LIVRE"
        },
        {
            imgUrl:"/livres/clean-code.png",
            title:"Clean Code",
            type: "LIVRE"
        },
        {
            imgUrl:"/livres/proposer.svg",
            title:"Proposer un livre",
            type: "PROPOSER"
        },
        
    ]
}
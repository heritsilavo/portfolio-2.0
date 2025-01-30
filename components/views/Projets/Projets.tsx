import "./Projet.css"

export default function Projets() {
  return (
    <section className="w-full mt-4 grid-container">
      <div className="projet-item-1 bg-accent"></div>
      <div className="projet-item-2 bg-accent"></div>
      <div className="projet-item-3 bg-accent"></div>
      <div className="projet-item-4 bg-accent"></div>
      <div className="projet-item-5 bg-accent max-md:hidden"></div>
      <div className="projet-item-6 bg-accent max-md:hidden"></div>
    </section>
  );
}

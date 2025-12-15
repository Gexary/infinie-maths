const links = ["Cours en ligne", "Concours", "Python", "À propos", "Contact"];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 mt-16 py-8 px-4 md:px-8 lg:px-16 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-xl font-bold">InfinieMaths</h1>
        <p className="text-sm mt-1">Les maths du lycée, simplement.</p>
        <div className="mt-4 flex flex-row gap-2 justify-between items-center flex-wrap">
          <p className="text-sm text-gray-400">© 2025 InfinieMaths. Tous droits réservés. Abdlilah Bouali, docteur en mathématiques pures.</p>
          <div className="flex flex-row md:gap-8 gap-4 flex-wrap">
            {links.map((link) => (
              <a key={link} href="#" className="text-blue-500 text-sm hover:underline">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

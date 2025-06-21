
import { Gamepad2 } from 'lucide-react';

const GamesSection = () => {
  const games = [
    {
      name: "Call of Duty: Black Ops 6",
      category: "FPS",
      color: "from-orange-500 to-red-600"
    },
    {
      name: "Call of Duty: Warzone",
      category: "Battle Royale",
      color: "from-green-500 to-blue-600"
    },
    {
      name: "Call of Duty: MW3",
      category: "FPS",
      color: "from-gray-500 to-gray-700"
    },
    {
      name: "Apex Legends",
      category: "Battle Royale",
      color: "from-orange-500 to-yellow-500"
    },
    {
      name: "Fortnite",
      category: "Battle Royale",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Valorant",
      category: "FPS",
      color: "from-red-500 to-pink-600"
    }
  ];

  return (
    <section id="games" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-6">
            <span className="text-white">Supported</span>{' '}
            <span className="gradient-text">Games</span>
          </h2>
          <p className="text-xl text-cure-gray-100 max-w-3xl mx-auto">
            CureProxy works with all major competitive games. Get easier lobbies across your favorite titles.
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div 
              key={index}
              className=" border-[1px] border-cure-green group relative bg-cure-gray-400/20 rounded-xl p-6 border border-cure-gray-300/20  transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0  bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <div className="relative  border-[1px]z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-cure-gray-400/50">
                      <Gamepad2 className="h-5 w-5 text-cure-green" />
                    </div>
                    <span className="text-sm text-cure-gray-100 bg-cure-gray-400/50 px-2 py-1 rounded">
                      {game.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-orbitron font-semibold text-white mb-2 group-hover:text-cure-green transition-colors">
                  {game.name}
                </h3>
                
                <div className="flex items-center space-x-2 text-cure-gray-100">
                  <div className="h-2 w-2 bg-cure-green rounded-full animate-pulse" />
                  <span className="text-sm">Fully Supported</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center  mt-12">
          <p className="text-cure-gray-100 mb-4">
            Don't see your game? <span className="text-cure-green">Contact us</span> - we're constantly adding support for new titles.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-cure-gray-100">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-cure-green rounded-full" />
              <span>Regular Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-cure-blue rounded-full" />
              <span>New Games Added Monthly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;

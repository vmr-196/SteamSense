import { useQuery } from "@tanstack/react-query";

import GameCard from "../components/game/GameCard";
import { getRecentlyViewed } from "../services/recentlyViewedService";

export default function RecentlyViewed() {

    const {
        data: games,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["recently-viewed"],
        queryFn: getRecentlyViewed,
    });

    if (isLoading)
        return <h1>Loading...</h1>;

    if (isError)
        return <h1>Error</h1>;

    return (

        <div>

            <h1 className="text-4xl font-bold mb-6">

                👀 Recently Viewed

            </h1>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {games.map((game: any) => (

                    <GameCard
                        key={game.app_id}
                        game={game}
                    />

                ))}

            </div>

        </div>

    );

}
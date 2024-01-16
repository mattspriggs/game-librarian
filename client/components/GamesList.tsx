import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery } from '@tanstack/react-query'

// Need to add pagination to display 20 games at a time
// Need to add lists by platform
// Maybe paginate alphabetically?
export default function GamesList() {
  const {
    data: gamesList,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['games'], queryFn: getGames })
  if (isError) {
    return <div>There was an error while getting your games</div>
  }
  if (!gamesList || isLoading) {
    return <div>Loading your games...</div>
  }
  console.log(gamesList)
  return (
    <section className="main">
      <ul>
        {gamesList.sort().map((game) => (
          <li key={game.id}>
            <Link to={`/${game.id}`} className="link">
              {game.title}
            </Link>{' '}
            on {game.platform}
          </li>
        ))}
      </ul>
    </section>
  )
}

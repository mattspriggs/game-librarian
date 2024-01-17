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

  function platformList(platform: string) {
    const result = gamesList?.filter((game) => game.platform === platform)
    return result
  }
  console.log('platform list', platformList('Nintendo Switch'))
  // Create select function that will filter using the platform filter function
  return (
    <section className="main">
      <p>
        <label htmlFor="platform">Which platform?</label>
        <br />
        <br />
        <select
          name="platform"
          id="platform"
          // onChange={handleChange}
          // value={platform}
          aria-label="Game platform selection"
          required
        >
          <option value="">-- Platform --</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Playstation 5">Playstation 5</option>
          <option value="Xbox Series X">Xbox Series X</option>
          <option value="PC">PC</option>
          <option value="PC - Steam Deck - Playable">
            PC - Deck - Playable
          </option>
          <option value="PC - Steam Deck - Verified">
            PC - Deck - Verified
          </option>
        </select>
      </p>
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

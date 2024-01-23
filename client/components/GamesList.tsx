import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { Games } from '../../models/games'
// Need to add pagination to display 20 games at a time
// Maybe paginate alphabetically?

export default function GamesList() {
  const {
    data: gamesList,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['games'], queryFn: getGames })

  const [platform, setPlatform] = useState<Games[]>()
  if (isError) {
    return <div>There was an error while getting your games</div>
  }

  if (!gamesList || isLoading) {
    return <div>Loading your games...</div>
  }

  function platformList(platform: string) {
    const result = gamesList?.filter((game) => game.platform === platform)
    return result
  }

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const platformSelected = event.target.value
    if (platformSelected === '') {
      // clear
      setPlatform(gamesList as Games[])
    } else {
      const newList = platformList(platformSelected)
      setPlatform(newList as Games[])
    }
  }

  return (
    <section className="main">
      <form>
        <label htmlFor="platform">Games by Platform </label>
        <select
          name="platform"
          id="platform"
          onChange={handleChange}
          aria-label="Game list by platform selection"
          required
        >
          <option value="">-- All --</option>
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
          <option value="Quest 2">Quest 2</option>
        </select>

        <ul>
          {!platform && gamesList ? (
            <>
              {gamesList.map((game) => (
                <li key={game.id}>
                  <Link to={`/${game.id}`} className="link">
                    {game.title}
                  </Link>{' '}
                  on {game.platform}
                </li>
              ))}
            </>
          ) : (
            <>
              {platform?.map((game) => (
                <li key={game.id}>
                  <Link to={`/${game.id}`} className="link">
                    {game.title}
                  </Link>{' '}
                  on {game.platform}
                </li>
              ))}
            </>
          )}
        </ul>
      </form>
    </section>
  )
}

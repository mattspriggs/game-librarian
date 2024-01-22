import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState, FormEvent } from 'react'
// Need to add pagination to display 20 games at a time
// Need to manage state and re-render when the select is used to show change in platform
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const platformSelected = event.target.value
    const newList = platformList(platformSelected)
    console.log('filterd list from select', newList)
    return newList
  }

  return (
    <section className="main">
      <form>
        <label htmlFor="platform">Games by Platform </label>

        <select
          name="platform"
          id="platform"
          onChange={handleChange}
          // value={platform}
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
        </select>

        <ul>
          {gamesList.map((game) => (
            <li key={game.id}>
              <Link to={`/${game.id}`} className="link">
                {game.title}
              </Link>{' '}
              on {game.platform}
            </li>
          ))}
        </ul>
      </form>
    </section>
  )
}

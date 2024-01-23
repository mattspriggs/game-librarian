import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState, FormEvent } from 'react'
import { Games } from '../../models/games'
// Need to add pagination to display 20 games at a time
// Need to manage state and re-render when the select is used to show change in platform
// May need to switch to working with props and a new component or perhaps using a different route
// Maybe paginate alphabetically?

export default function GamesList() {
  const {
    data: gamesList,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['games'], queryFn: getGames })

  const [form, setForm] = useState<Games[]>(gamesList as Games[])
  const [platform, setPlatform] = useState(gamesList as Games[])
  if (isError) {
    return <div>There was an error while getting your games</div>
  }

  if (!gamesList || isLoading) {
    return <div>Loading your games...</div>
  }
  console.log(gamesList)
  console.log('From set form', form)
  console.log('From set platform', platform)

  function platformList(platform: string) {
    const result = gamesList?.filter((game) => game.platform === platform)
    return result
  }
  // console.log('platform list', platformList('Nintendo Switch'))

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const platformSelected = event.target.value
    if (platformSelected === '') setPlatform(gamesList as Games[])
    const newList = platformList(platformSelected)
    console.log('filterd list from select', newList)
    setForm(newList as Games[])
    setPlatform(newList as Games[])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // const platformSelected = event.target
    // console.log('platform selected', platformSelected)
    // const newList = platformList(platformSelected)
    // console.log('filterd list from select', newList)
    // setForm(newList as Games[])
  }

  return (
    <section className="main">
      <form onSubmit={handleSubmit}>
        <label htmlFor="platform">Games by Platform </label>

        <select
          name="platform"
          id="platform"
          onChange={handleChange}
          // valu}={platform}
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
          {/* {gamesList.map((game) => (
            <li key={game.id}>
              <Link to={`/${game.id}`} className="link">
                {game.title}
              </Link>{' '}
              on {game.platform}
            </li>
          ))} */}
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
              {platform.map((game) => (
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

import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Games } from '../../models/games'

export default function Search() {
  const {
    data: gamesList,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['games'], queryFn: getGames })

  const [form, setForm] = useState({})
  const [games, setGames] = useState<Games[]>(gamesList as Games[])
  const [gameTitle, setGameTitle] = useState<Games[]>()
  let search = ''

  if (isError) {
    return <div>There was an error while getting your games</div>
  }

  if (!gamesList || isLoading) {
    return <div>Loading your games...</div>
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const searchArray: string[] = Object.values(form)
    search = searchArray[0]
    const gameSearchResult = gamesList?.filter((game) =>
      game.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    setGameTitle(gameSearchResult as Games[])
    console.log('game title in state: ', gameTitle)
  }
  console.log('Search results: ', gameTitle)

  function getGame() {
    games.filter
  }

  return (
    <>
      <h2>Find a game in your library!</h2>
      <form
        onSubmit={handleSubmit}
        aria-label="Form to search for a game by title."
      >
        <p>
          <label htmlFor="title">Search by title: </label>
          <input
            type="text"
            id="title"
            // value={form.title}
            onChange={handleChange}
            name="title"
            aria-label="Enter the name of a game to search for into this field."
            autoComplete="on"
          />
          <button>Search</button>
        </p>
        <br />
        <ul>
          {gameTitle ? (
            <>
              {gameTitle.map((game) => (
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
              <h2>What game are you looking for?</h2>
            </>
          )}
        </ul>
      </form>
    </>
  )
}

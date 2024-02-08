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
  const [notFound, setNotFound] = useState(false)
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
    const search = searchArray[0]
    const gameSearchResult = gamesList?.filter((game) =>
      game.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )

    if (gameSearchResult?.length === 0) {
      setNotFound(true)
    } else {
      setGameTitle(gameSearchResult as Games[])
    }
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
            onChange={handleChange}
            name="title"
            aria-label="Enter the name of a game to search for into this field."
            autoComplete="on"
            required
          />
          <button>Search</button>
        </p>
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
          ) : notFound ? (
            <>
              <h2>Game not found</h2>
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

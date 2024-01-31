import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Games } from '../../models/games'
import e from 'express'

export default function Search() {
  const {
    data: gamesList,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['games'], queryFn: getGames })

  const [form, setForm] = useState({})
  const [games, setGames] = useState<Games[]>(gamesList as Games[])

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
    //get user input and use autocomplete on input
    //find the title of the game from the gamesList[]
    //display the game or display "Game not found in library"
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
          />
        </p>
      </form>
    </>
  )
}

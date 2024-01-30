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

  const [games, setGames] = useState<Games[]>(gamesList as Games[])
  if (isError) {
    return <div>There was an error while getting your games</div>
  }

  if (!gamesList || isLoading) {
    return <div>Loading your games...</div>
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    //get user input and use autocomplete on input
    //find the title of the game from the gamesList[]
    //display the game or display "Game not found in library"
  }

  return (
    <>
      <h2>Search</h2>
      <form
        onSubmit={handleSubmit}
        aria-label="Enter the name of a game to search for."
      ></form>
    </>
  )
}

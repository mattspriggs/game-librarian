import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGameById } from '../apis/games'
import { Games } from '../../models/games'
import { useQuery } from '@tanstack/react-query'
import { get } from 'superagent'

export default function GameDetails() {
  const { gameId } = useParams()
  const {
    data: gameDetails,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGameById(gameId as string),
  })

  if (isError) {
    return <p>There was an error getting this game...</p>
  }

  if (isLoading) {
    return <p>Loading your game...</p>
  }

  return (
    <section>
      <h2>Game Details:</h2>
      <p>Title: {gameDetails.title}</p>
      <p>Platform: {gameDetails.platform}</p>
      <br />
      <button>Edit</button>
      <button>Delete</button>
    </section>
  )
}

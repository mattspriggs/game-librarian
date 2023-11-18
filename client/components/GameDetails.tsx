import { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import { deleteGameSelected, getGameById } from '../apis/games'
import { Games, GamesData } from '../../models/games'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { get } from 'superagent'

interface Props {
  title: string
  platform: string
}

export default function GameDetails() {
  const queryClient = useQueryClient()

  const { gameId } = useParams()
  const {
    data: gameDetails,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGameById(gameId as string),
  })

  const deleteGame = useMutation(deleteGameSelected)
  // {
  //   mutationFn: deleteGameSelected,
  //   onSuccess: (deletId) => redirect('/'),
  // })

  if (isError) {
    return <p>There was an error getting this game...</p>
    // return redirect('/')
  }

  if (isLoading) {
    return <p>Loading your game...</p>
  }
  // const props: Props = {
  //   title: gameDetails.title,
  //   platform: gameDetails.platform,
  // }
  const handleDelete = () => {
    const deleteId = Number(gameId)
    deleteGame.mutate(deleteId)
  }
  const handleEdit = () => {}
  return (
    <section>
      <h2>Game Details:</h2>
      <p>Title: {gameDetails.title}</p>
      <p>Platform: {gameDetails.platform}</p>
      <br />
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </section>
  )
}

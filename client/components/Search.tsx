import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { Games } from '../../models/games'

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

  return <h2>Search</h2>
}

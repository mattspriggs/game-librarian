import { Link, Outlet } from 'react-router-dom'
import { getAllGames } from '../../server/db/games'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: gamesList,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['games'], queryFn: getAllGames })
  if (isError) {
    return <div>There was an error while getting your games</div>
  }
  if (!gamesList || isLoading) {
    return <div>Loading your games...</div>
  }

  return (
    <>
      <header className="header">
        <h1>Video Game Collection</h1>
      </header>
      <section className="main">
        <ul>
          {gamesList.map((game) => (
            <li key={game.id}>
              {game.title} on {game.platform}
            </li>
          ))}
        </ul>
      </section>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App

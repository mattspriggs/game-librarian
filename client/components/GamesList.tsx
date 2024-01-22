import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { Games } from '../../models/games'

// Need to add pagination to display 20 games at a time
// Need to add lists by platform
// Maybe paginate alphabetically?
export default function GamesList() {
  const queryClient = useQueryClient()
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
    if (platform === '') {
      console.log(gamesList)
    }
    const result = gamesList?.filter((game) => game.platform === platform)
    return result
  }
  let selected = false
  let platformSelected = ''
  let gameDisplay = Array(...gamesList)
  // Need to take the select value, have it run platformList() and re-render the list by the platform chosen
  // Need to invalidate query to change the render
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    platformSelected = event.target.value

    if (platformSelected) {
      selected = true
      queryClient.invalidateQueries({ queryKey: ['games'] })
      gameDisplay = platformList(platformSelected) as Games[]
      console.log('filterd list from select', gameDisplay, selected)
      return gameDisplay
    } else {
      // const newList = platformList(platformSelected) as Games[]
      // // alterList(newList)
      // selected = true
      // console.log('filterd list from select', newList, selected)
      return
    }
    //   const newList = platformList(platformSelected)
    // // alterList(newList)
    // console.log('filterd list from select', newList)
    // return newList
  }

  // function displayList() {}

  // Create select function that will filter using the platform filter function
  return (
    <>
      <section className="main">
        <p>
          <label htmlFor="platform">Games by Platform </label>

          <select
            name="platform"
            id="platform"
            onChange={handleChange}
            // value={platform}
            aria-label="Game list by platform selection"
          >
            <option value="">-- All --</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Playstation 5">Playstation 5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="PC">PC</option>
            <option value="PC - Steam Deck - Playable">
              PC - Steam Deck - Playable
            </option>
            <option value="PC - Steam Deck - Verified">
              PC - Steam Deck - Verified
            </option>
          </select>
        </p>

        {!selected ? (
          <>
            {gameDisplay.map((game) => (
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
            {gameDisplay.map((game) => (
              <li key={game.id}>
                <Link to={`/${game.id}`} className="link">
                  {game.title}
                </Link>{' '}
                on {game.platform}
              </li>
            ))}
          </>
        )}
      </section>
    </>
  )
}

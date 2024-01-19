import { Link } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useQuery } from '@tanstack/react-query'
import { Games } from '../../models/games'

// Need to add pagination to display 20 games at a time
// Need to add lists by platform
// Maybe paginate alphabetically?
export default function GamesList() {
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
    const result = gamesList?.filter((game) => game.platform === platform)
    return result
  }
  let selected = true
  let platformSelected = ''
  let newList: Games[]
  // function alterList(newList: Games[]) {
  //   gamesList
  // }
  // console.log('platform list', platformList('Nintendo Switch'))
  // const newList: Games[] = [] test commit
  // Need to take the select value, have it run platformList() and re-render the list by the platform chosen
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    platformSelected = event.target.value
    if (!platformSelected) {
      selected = !selected
      return console.log(gamesList)
    } else {
      selected = !selected
      newList = platformList(platformSelected)
      // alterList(newList)
      console.log('filterd list from select', newList)
      return newList
    }
    //   const newList = platformList(platformSelected)
    // // alterList(newList)
    // console.log('filterd list from select', newList)
    // return newList
  }

  function displayList() {}

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
          <div>
            {gamesList.sort().map((game) => (
              <>
                <ul>
                  <li key={game.id}>
                    <Link to={`/${game.id}`} className="link">
                      {game.title}
                    </Link>{' '}
                    on {game.platform}
                  </li>
                </ul>
              </>
            ))}
          </div>
        ) : (
          <div>
            {newList.sort().map((game) => (
              <>
                <ul>
                  <li key={game.id}>
                    <Link to={`/${game.id}`} className="link">
                      {game.title}
                    </Link>{' '}
                    on {game.platform}
                  </li>
                </ul>
              </>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

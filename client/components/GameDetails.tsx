import { ChangeEvent, useState, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  deleteGameSelected,
  getGameById,
  updateSelectedGame,
} from '../apis/games'
import { Games, GamesData } from '../../models/games'
import {
  useMutation,
  useQuery,
  // useQueryClient,
} from '@tanstack/react-query'
// import { get } from 'superagent'

interface Props {
  title: string
  platform: string
}

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

  // const queryClient = useQueryClient()

  const [editing, setEditing] = useState(false)

  const initialFormData = {
    title: gameDetails?.title,
    platform: gameDetails?.platform,
  }

  const [form, setForm] = useState<GamesData>(initialFormData as GamesData)

  const navigate = useNavigate()

  const editGameMutation = useMutation(updateSelectedGame)

  const deleteGame = useMutation(deleteGameSelected, {
    onSuccess: () => navigate('/'),
  })

  if (isError) {
    return <p>There was an error getting this game...</p>
  }

  if (isLoading) {
    return <p>Loading your game...</p>
  }

  const props: Props = {
    title: gameDetails.title,
    platform: gameDetails.platform,
  }

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target
  //   const newForm = { ...form, [name]: value }
  // }

  const handleDelete = () => {
    const deleteId = Number(gameId)
    deleteGame.mutate(deleteId)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  const handleSaveEdits = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const gameIdSelected = Number(gameId)
    editGameMutation.mutate(gameIdSelected, form)
    // setForm(initialFormData as GamesData)
    // const game = { id }
    setEditing(false)
  }
  const handleCancelEdits = () => {
    setEditing(false)
  }

  const handleEdit = () => {
    setEditing(true)
    setForm(initialFormData as GamesData)
  }
  return (
    <>
      <h2>Game Details:</h2>
      {editing ? (
        <div>
          <form
            onSubmit={handleSaveEdits}
            aria-label="Form to edit the game title and platform"
          >
            <p>
              <label htmlFor="title">Title:</label>
              <input
                aria-label="Edit game title"
                type="text"
                id="title"
                name="title"
                placeholder={gameDetails.title}
                value={form.title}
                onChange={handleChange}
              />
            </p>
            <p>
              <label htmlFor="platform">Platform:</label>
              <input
                aria-label="Edit game platform"
                type="text"
                id="platform"
                name="platform"
                placeholder={gameDetails.platform}
                value={form.platform}
                onChange={handleChange}
              />
            </p>
            <button type="submit">Save Edits</button>
            <button onClick={handleCancelEdits}>Cancel Edits</button>
          </form>
        </div>
      ) : (
        <section>
          <p>Title: {gameDetails.title}</p>
          <p>Platform: {gameDetails.platform}</p>
          <br />
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </section>
      )}
    </>
  )
}

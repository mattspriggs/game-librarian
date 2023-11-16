import { ChangeEvent, FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addGame } from '../apis/games'
import { GamesData, Games } from '../../models/games'

const initialFormData = {
  title: '',
  platform: '',
}

export default function GameForm() {
  const [form, setForm] = useState<GamesData>(initialFormData)

  const queryClient = useQueryClient()

  const gameAddMutation = useMutation({
    mutationFn: addGame,
    onSuccess: (newGame) => {
      const currentGame = queryClient.getQueryData<Games[]>(['game'])
      if (currentGame) {
        queryClient.setQueryData(['game'], [...currentGame, newGame])
      }
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }
}

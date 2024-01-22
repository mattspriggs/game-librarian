import request from 'superagent'
import { Games, GamesData } from '../../models/games'

const serverUrl = '/api/v1/games'

// GET /api/v1/games
export async function getGames(): Promise<Games[]> {
  const response = await request.get(serverUrl)
  return response.body.games
}

// GET /api/v1/games/:gameId
export async function getGameById(gameId: string): Promise<Games> {
  const response = await request.get(`${serverUrl}/${gameId}`)
  return response.body.game
}

// GET /api/v1/games/:platform
export async function fetchGamesByPlat(platform: string): Promise<Games[]> {
  const response = await request.get(`${serverUrl}/${platform}`)
  return response.body.gameByPlat
}

// POST /api/v1/games
export async function addGame(newGame: GamesData): Promise<Games> {
  console.log(newGame)
  const response = await request.post('/api/v1/games').send(newGame)
  return response.body.games
}

// DELETE /api/v1/games/:gameId
export async function deleteGameSelected(id: string): Promise<void> {
  await request.delete(`${serverUrl}/${id}`)
}

// PATCH /api/v1/games
export async function updateSelectedGame(editedGame: Games): Promise<void> {
  await request.patch(`${serverUrl}/${editedGame.id}`).send(editedGame)
}

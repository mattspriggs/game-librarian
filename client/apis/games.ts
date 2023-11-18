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

// POST /api/v1/games
export async function addGame(newGame: GamesData): Promise<Games> {
  console.log(newGame)
  const response = await request.post('/api/v1/games').send(newGame)
  return response.body.games
}

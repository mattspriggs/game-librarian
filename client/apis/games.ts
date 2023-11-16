import request from 'superagent'
import { Games, GamesData } from '../../models/games'

const serverUrl = '/api/v1/games'
export async function getGames(): Promise<Games[]> {
  const response = await request.get(serverUrl)
  return response.body.games
}

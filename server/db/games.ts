import db from './connection'
import { Games, GamesData } from '../../models/games'

export async function getAllGames(): Promise<Games[]> {
  const games = await db('games').select()
  return games
}

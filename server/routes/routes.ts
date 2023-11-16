import express from 'express'
import * as db from '../db/games'
import { GamesData } from '../../models/games'

const router = express.Router()

// GET /api/v1/games
router.get('/', async (req, res) => {
  try {
    const games = await db.getAllGames()
    res.json({ games })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// GET /api/v1/games/:gamesId
router.get('/:gamesId', async (req, res) => {
  try {
    const gamesId = Number(req.params.gamesId)
    if (isNaN(gamesId)) {
      res.sendStatus(400)
      return
    }
    const game = await db.getGameById(gamesId)
    res.json({ game })
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
    return
  }
})

// POST /api/v1/games
router.post('/', async (req, res) => {
  try {
    const game = req.body as GamesData
    const newGame = await db.addGame(game)
    // console.log(newGame)
    if (!game) {
      res.sendStatus(400)
      return
    }
    res.status(400).json(newGame)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// DELETE /api/v1/games/:id
router.delete('/:id', async (req, res) => {
  try {
    const game = req.body
    const gameId = Number(req.params.id)
    await db.deleteGame(game, gameId)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'An error occurred while deleting the post',
    })
  }
})

export default router
import { Link, Outlet } from 'react-router-dom'
import { getGames } from '../apis/games'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

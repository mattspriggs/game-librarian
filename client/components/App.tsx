import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <header className="header">
        <h1>
          <Link to={'/'} className="link">
            Video Game Collection
          </Link>{' '}
          |{' '}
          <Link to={'add'} className="link">
            Add A Game
          </Link>{' '}
          |{' '}
          <Link to={'search'} className="link">
            Find A Game
          </Link>
        </h1>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App

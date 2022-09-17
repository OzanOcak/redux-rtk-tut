import reactLogo from './assets/react.svg'
import './App.css'
import { useAppSelector } from './app/hooks'
import { useDispatch } from 'react-redux'
import { amountAdded, incremented } from './features/counter/counter-slice'
import { useFetchBreedsQuery } from './features/dogs/dogs-api-slice'

function App() {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useDispatch();

  const { data = [], isFetching } = useFetchBreedsQuery(); // data is breed[] or undefine


  function handleClick(){
    dispatch(incremented())
  }
  function increasedByFour(){
    dispatch(amountAdded(4))
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        <button onClick={increasedByFour}> add 4 </button>
        <div>
          <p>Number of dogs fetched: {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {data.map((breed) => (
                <tr key={breed.id}>
                  <td>{breed.name}</td>
                  <td>
                    <img src={breed.image.url} alt={breed.name} height={250} width={300} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App

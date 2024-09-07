import './App.css'
import Userform from './Userform'
import Todolist from './components/Todolist'
import { RecoilRoot } from 'recoil';

function App() {

  return (
    <>
      <RecoilRoot>
        <Todolist></Todolist>
      </RecoilRoot>
    </>
  )
}

export default App


import './App.css'
import NavBar from './component/NavBar'
import { BrowserRouter } from 'react-router-dom'
import Pages from './pages/Pages'
import styled from 'styled-components'

const Content = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 2rem;
  margin: 2rem auto;
  max-width: 150rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: white;
  }
`



function App() {

  return (
    <>
      <BrowserRouter>
        <Content>
          <h1> <img
            src=".../../public/wild crowned logo.png"
            alt="Logo"
            style={{ width: '50px', height: '35px', }}
          /><br/>To-Do List</h1>
          <NavBar />
          <br />
          <Pages />
        </Content>
      </BrowserRouter>
    </>
  )
}

export default App

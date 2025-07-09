
import './App.css'
import NavBar from './component/NavBar'
import { BrowserRouter } from 'react-router-dom'
import Pages from './pages/Pages'
import styled from 'styled-components'

const Content = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border-radius: 35px;
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
         
          <Pages />
        </Content>
      </BrowserRouter>
    </>
  )
}

export default App

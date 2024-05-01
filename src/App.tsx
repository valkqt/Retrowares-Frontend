import { Container } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PostForm from './components/PostForm';

function App() {

  return (
    <>
      <Container>
        <header>
          <h1>Pepe</h1>
        </header>
        <main>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quidem officiis voluptate expedita reiciendis officia enim placeat molestias quisquam atque iste maiores maxime, assumenda tempore cumque cupiditate nulla quos ea?</p>
          <PostForm></PostForm>
        </main>
        <footer></footer>
      </Container>
    </>
  )
}

export default App

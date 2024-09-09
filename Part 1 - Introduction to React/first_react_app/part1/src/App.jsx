const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)
  
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Gianluca"/>
      <Hello name="Melinda"/>
    </div>
  )
}

export default App
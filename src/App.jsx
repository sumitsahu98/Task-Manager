import TodoList from "./Taskmanager";

function App(){
  return (
    <div style={{
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center", // center vertically
    marginTop:"100px",
    alignItems: "center",     // center horizontally
    height: "100vh",          // full viewport height
    width: "100vw",           // full viewport width
  }}>
      <TodoList/>
    </div>
  )
}
export default App;
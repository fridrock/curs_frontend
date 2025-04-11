import useAxios from "../hooks/useAxios";
import Header from "./default/Header";

function Home() {
  const { api } = useAxios()
  
  async function getQuery(){
    try{
      await api.get("/users/get")
    }catch(error){
      console.log(error)
      //TODO error handling
    }
  }
  return (
    <div className="Home">
      <Header></Header>
      I am home component
      <button onClick={()=>getQuery()}>Send</button>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react"
import axios from "axios"


function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  getMethod = useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        setUsers(response.data);
      } 
      catch (err) {
        setError("Something Went Wrong");
      }
      finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);


  postMethod = useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
        );
      } 
      catch (err) {
        setError("Something Went Wrong");
      }
      finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);



  if(loading)
    return <h2>Loading</h2>
  if (error)
    return <h2>{error}</h2>

  return (
    <>
      <div>
        {users.map((usr) => (
          <p key={usr.id}>{usr.id} = {usr.name}</p>
          ))}
      </div>
    </>
  );
}

export default App
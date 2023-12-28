import './App.css'
import DisplayUsers from './components/DisplayUser';
import Form from './components/Form/Form';
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState({});

  useEffect(()=>{
    const sessionUser = sessionStorage.getItem('userId')
    setUser(JSON.parse(sessionUser || '{}'))
  }, [JSON.stringify(user)])
  return (
    <UserContext.Provider value={{user, setUser}}>
      <Form></Form>
      <DisplayUsers></DisplayUsers>
    </UserContext.Provider>
  )
}

export default App

/* eslint-disable react/prop-types */
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useState } from "react";
import { UserContext } from "../App";

const UsersTable = ({ usersData }) => {
    const {setUser: setUserContext} = useContext(UserContext);

    if (!usersData.length) {
        return null;
    }

    const setUser = async (id) => {
        await getDoc(doc(db, 'users', id))
            .then((doc) => {
                console.log(doc.data());
                
                setUserContext({...doc.data(), id: id});
                sessionStorage.setItem("userId", JSON.stringify({...doc.data(), id: id}));
            })
    }

    const users = usersData.map((user) => {
        return (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.sector}</td>
                <td>{user.isAgreed ? 'yes' : 'no'}</td>
                <td><button onClick={()=>setUser(user.id)}>select</button></td>
            </tr>
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sector</th>
                    <th>Agree To Term</th>
                </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
        </table>
    )
}
export const DisplayUsers = () => {
    const [usersData, setUsersData] = useState([])
    const fetchUsers = async () => {
        await getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsersData(newData)
            })

    }

    return (
        <div>
            <button onClick={fetchUsers}>Get All Users</button>
            <UsersTable usersData={usersData}></UsersTable>
        </div>
    )
}

export default DisplayUsers;
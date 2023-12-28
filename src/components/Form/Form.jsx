import Input from "../Input";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Select from "../Select";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";

export const Form = () => {
    const { setUser, user } = useContext(UserContext);
    const [selects, setSelects] = useState({});
    const [userState, setUserState] = useState({
        name: '',
        isAgreed: false,
        sector: '1'
    });

    useEffect(()=>{
        setUserState(user)
    }, [JSON.stringify(user)]);

    const fetchPost = async () => {
        await getDocs(collection(db, "categories"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setSelects(newData[0]);
            })

    }
    const submit = async (e) => {
        e.preventDefault();

        try {
            if (user.id) {
                await updateDoc(doc(db, "users", user.id), {
                    isAgreed: userState.isAgreed,
                    name: userState.name,
                    sector: userState.sector,
                });
            } else {
                await addDoc(collection(db, "users"), {
                    isAgreed: userState.isAgreed,
                    name: userState.name,
                    sector: userState.sector,
                });
            }

            setUser({
                name: '',
                isAgreed: false,
                sector: '1'
            })
            sessionStorage.setItem("userId", JSON.stringify({
                name: '',
                isAgreed: false,
                sector: '1'
            }));
            setUserState({
                name: '',
                isAgreed: false,
                sector: '1'
            })
        } catch (e) {
            console.error(e);
        }
    }
    const formRef = useRef(null);
    useEffect(() => {
        fetchPost();
    }, [])
    const onNameChange = (name) => {
        setUserState({...userState, name: name})
    }

    const onSectorChange = (sector) => {
        setUserState({...userState, sector: sector})
    }

    const onIsAgreed = (isAgreed) => {
        setUserState({...userState, isAgreed: isAgreed})
    }

    return (
        <section>
            <h1>Please enter your name and pick the Sectors you are currently involved in.</h1>
            {user.name ? <h2>Current User: {user.name} with id: {user.id}</h2> : ''}
            <form onSubmit={submit} ref={formRef}>
                <div>
                    <Input label="Name:" type="text" name="name" required value={userState.name} onChange={onNameChange}/>
                </div>
                <div>
                    <Select data={selects} label="Sectors" required value={userState.sector} onChange={onSectorChange}></Select>
                </div>
                <div>
                    <Input label="Agree to terms" type="checkbox" name="agree" required value={userState.isAgreed} onChange={onIsAgreed}/>
                </div>
                <button type="submit">Save</button>
            </form>
        </section>
    )
}

export default Form;
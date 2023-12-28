import Input from "../Input";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Select from "../Select";
import { useEffect, useState } from "react";

export const Form = () => {
    const [selects, setSelects] = useState({});
    const fetchPost = async () => {
        await getDocs(collection(db, "categories"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setSelects(newData[0]);
            })
       
    }
    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData(form);
        console.log(formData)
        try {
            const docRef = await addDoc(collection(db, "users"), {
              isAgreed: formData.get('agree'),    
              name: formData.get('name'),    
              sector: formData.get('sector'),    
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    useEffect(()=>{
        fetchPost();
    }, [])


    return(
        <section>
            <h1>Please enter your name and pick the Sectors you are currently involved in.</h1>
            <form onSubmit={submit}>
                <div>
                    <Input label="Name:" type="text" name="name" required/>
                </div>
                <div>
                    <Select data={selects} label="Sectors" required></Select>
                </div>
                <div>
                    <Input label="Agree to terms" type="checkbox" name="agree" required/>
                </div>
                <button type="submit">Save</button>
            </form>
        </section>

    )
}

export default Form;
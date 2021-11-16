import React, {useState, useEffect} from 'react'
import { auth } from '../firebaseconfig'
import {db} from '../firebaseconfig'
import { getDoc, getDocs, doc, addDoc, collection, deleteDoc, setDoc } from '@firebase/firestore'
import { async } from '@firebase/util'

export const Inicio = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [books, setBooks] = useState([])
    const [error, setError] = useState('')
    const [modoEdicion, setEdicion] = useState('')
    const [idBook, setIdBook] = useState('')

    useEffect(()=>{
        const getBooks = async () =>{
            try {
                const {docs} = await getDocs(collection(db, "books"))
                const newArray = docs.map((item)=>({id:item.id, ...item.data()}))
                setBooks(newArray)
            } catch (error) {
                console.log(error)
            }
        }
        getBooks()
    },[])

    const createBooks = async (e) =>{
        e.preventDefault()
        if(!title.trim()){
            setError("The field title is required")
        } else if(!author.trim()){
            setError("The field author is required")
        }
        const book = {
            title: title,
            author: author
        }
        try {
            const data = await addDoc(collection(db,'books'),{book})
            const {docs} = await getDocs(collection(db, "books"))
            const newArray = await docs.map((item)=>({id: item.id, ...item.data()}))
            setBooks(newArray)
            console.log('Libro añadido')
        } catch (e) {
            console.log(e)
        }
        setTitle('')
        setAuthor('')
        setError('')
    }
const deleteBook = async (id) => {
    try {
        await deleteDoc(doc(db,"books",id))
        const {docs} = await getDocs(collection(db,"books"));
        const newArray = docs.map((item)=>({id:item.id, ...item.data()}));
        setBooks(newArray)
    } catch (error) {
        console.log(error)
    }
}

const pushEdit = async (id) => {
    try {
        const data = await getDoc(doc(db, "books", id))
        const {title, author} = data.data().book
        console.log(id)
        setTitle(title)
        setAuthor(author)
        setIdBook(id)
        setEdicion(true)
    } catch (error) {
        console.log(error)
    }
}

const setUpdate = async (e)=>{
    e.preventDefault()
    if(!title.trim()){
        setError("The field title is required")
    } else if(!author.trim()){
        setError("The field author is required")
    }
    const book = {
        title: title,
        author: author
    }
    try {
        await setDoc(doc(db,"books",idBook),{book})
        const {docs} = await getDocs(collection(db, "books"))
        const newArray = docs.map((item)=>({id:item.id,...item.data()}))
        setBooks(newArray)
    } catch (error) {
        console.log(error)
    }
    setEdicion(false)
    setIdBook('')
    setAuthor('')
    setTitle('')
    setError('')
}


    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col">
                    <h1>Add Books</h1>
                    <form onSubmit={modoEdicion ? setUpdate : createBooks} className="form-group" >
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" type="text" placeholder="Insert title" />
                        <input value={author} onChange={(e)=>setAuthor(e.target.value)} className="form-control mt-3" type="text" placeholder="Insert author" />

                        {
                            modoEdicion
                            ?
                            <input type="submit" value="Update" className="btn btn-info col-12 mt-3" />
                            :
                            <input type="submit" value="Add" className="btn btn-info col-12 mt-3" />
                        }
                    </form>
                    {
                        error 
                        ?
                        <p>{error}</p>
                        :
                        <span></span>
                    }
                </div>
                <div className="col">
                    <h1>List of Books</h1>
                    <ul className="list-group">

                    {
                        books.length !== 0

                        ?

                        (books.map((item)=>
                        (
                            <li className="list-group-item" key={item.book.id}>
                                {item.book.title} -- {item.book.author}
                                <button onClick={(id)=>(deleteBook(item.id))} className="btn btn-danger ms-2 float-end">Delete</button>
                                <button onClick={(id)=>(pushEdit(item.id))} className="btn btn-info float-end">Edit</button>
                            </li>
                        )))
                        :
                        <span>
                            No books
                        </span>
                    }

                    </ul>
                </div>
            </div>
        </div>
    )
}

import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EditPost.css'
import { supabase } from '../client'

const EditPost = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""})
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Unable to fetch post:', error)
                setErrorMessage(error.message)
                return
            }

            setPost(data)
        }

        fetchPost()
    }, [id])

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault()
        setErrorMessage("")

        const { data, error } = await supabase
            .from('Posts')
            .update({
                title: post.title,
                author: post.author,
                description: post.description,
            })
            .eq('id', id)
            .select()

        if (error) {
            console.error('Unable to update post:', error)
            setErrorMessage(error.message)
            return
        }

        if (!data || data.length === 0) {
            const message = 'No post was updated. Check that this post has a matching id.'
            console.error(message)
            setErrorMessage(message)
            return
        }

        navigate('/')
    }

    const deletePost = async (event) => {
        event.preventDefault()

        const { error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Unable to delete post:', error)
            return
        }

        navigate('/')
    }

    return (
        <div>
            <form onSubmit={updatePost}>
                {errorMessage && <p role="alert">{`Unable to save changes: ${errorMessage}`}</p>}
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
                <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost
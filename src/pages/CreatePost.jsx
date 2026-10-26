import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", author: "", description: ""})
    const [errorMessage, setErrorMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault()
        setErrorMessage("")
        setIsSubmitting(true)

        try {
            const { error } = await supabase
                .from('Posts')
                .insert({
                    title: post.title,
                    author: post.author,
                    description: post.description,
                })

            if (error) {
                console.error('Unable to create post:', error)
                setErrorMessage(error.message)
                return
            }

            navigate('/')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <form onSubmit={createPost}>
                {errorMessage && <p role="alert">{`Unable to submit challenge: ${errorMessage}`}</p>}
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>
                <input type="submit" value={isSubmitting ? "Submitting..." : "Submit"} disabled={isSubmitting} />
            </form>
        </div>
    )
}

export default CreatePost
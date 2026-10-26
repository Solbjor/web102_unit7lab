import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'

const ReadPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')

            if (error) {
                console.error('Unable to fetch posts:', error)
                return
            }

            setPosts(data)
        }

        fetchPosts()
    }, [])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        author={post.author}
                        description={post.description}
                        betCount={post.betCount}
                    />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts
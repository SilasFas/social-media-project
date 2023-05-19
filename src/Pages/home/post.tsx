import styles from './post.module.css'

import { Post as interfacePost } from "./Home"
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { database, auth } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'

interface Props {
    post: interfacePost
}

interface Like {
    userId: string
    likeId: string
}

export const Post = (props: Props) => {
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState<Like[] | null>(null)

    const { post } = props
    const likesRef = collection(database, 'likes')

    const likesDoc = query(likesRef, where('postId', '==', post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))

    }

    const addLike = async () => {
        const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id })

        try {

            if (user) {
                setLikes((prev) =>
                    prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                        : [{ userId: user?.uid, likeId: newDoc.id }]
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where('postId', '==', post.id),
                where('userId', '==', user?.uid)
            )

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(database, 'likes', likeToDeleteData.docs[0].id)
            await deleteDoc(likeToDelete)
            if (user) {
                setLikes((prev) =>
                    prev && prev.filter((like) => like.likeId !== likeId))
            }
        } catch (error) {
            console.log(error)
        }
    }


    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes()
    }, [])

    return (
        <div className={styles.parent}>
            <div className="title"><h1>{post.title}</h1></div>
            <div className="body"><p>{post.description}</p></div>

            <div className="footer">
                <p>@{post.username}</p>
                <button
                    onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p>Likes: {likes?.length} </p>}
            </div>

        </div>
    )
}
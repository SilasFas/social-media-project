import styles from './create-form.module.css'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { database, auth } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

interface CreateformData {
    title: string
    description: string
}

export const CreateForm = () => {

    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().required('You must add a tille'),
        description: yup.string().required('You must add a description'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateformData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(database, 'posts')

    const onCreatePost = async (data: CreateformData) => {
        await addDoc(postsRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        })
        navigate("/")
    }

    return (
        <div className={styles.parent}>
            <form onSubmit={handleSubmit(onCreatePost)}>

                <input type="text" placeholder='Title...' {...register('title')} className={styles.silas} />
                <p style={{ color: 'red' }}>{errors.title?.message}</p>

                <textarea placeholder='Description...' {...register('description')}></textarea>
                <p style={{ color: 'red' }}>{errors.description?.message}</p>

                <input className={styles.submit} type="submit" value="Post" />
            </form >
        </div>
    )
}
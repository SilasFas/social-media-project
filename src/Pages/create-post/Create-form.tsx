import styles from './create-form.module.css'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface CreateformData {
    Title: string
    Description: string
}

export const CreateForm = () => {

    const schema = yup.object().shape({
        Title: yup.string().required('You must add a tille'),
        Description: yup.string().required('You must add a description'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateformData>({
        resolver: yupResolver(schema)
    })

    const onCreatePost = (data: CreateformData) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onCreatePost)} className={styles.parent}>

            <input type="text" placeholder='Title...' {...register('Title')} />
            <p style={{ color: 'red' }}>{errors.Title?.message}</p>

            <textarea placeholder='Description...' {...register('Description')}></textarea>
            <p style={{ color: 'red' }}>{errors.Description?.message}</p>

            <input type="submit" value="Post" />

        </form >
    )
}
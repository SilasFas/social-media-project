import styles from './CreatePost.module.css'
import { CreateForm } from './Create-form'

export const CreatePost = () => {
    return (
        <div className={styles.parent}>
            <h1>New Post</h1>
            < CreateForm />
        </div>
    )
}
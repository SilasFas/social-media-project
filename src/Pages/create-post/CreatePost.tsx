import styles from './CreatePost.module.css'
import { CreateForm } from './Create-form'

export const CreatePost = () => {
    return (
        <div className={styles.parent}>
            < CreateForm />
        </div>
    )
}
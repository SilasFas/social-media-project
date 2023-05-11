import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

import styles from './Login.module.css'

export const Login = () => {
    const navigate = useNavigate()

    const SignInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate('/')
    }

    return (
        <div className={styles.parent}>
            <p>Sign In With Google To Continue</p>
            <button onClick={SignInWithGoogle} > Sign In Witth Google</button>
        </div>
    )
}
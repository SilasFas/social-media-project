import { Link } from 'react-router-dom';
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';

import styles from './Navbar.module.css'

export const Navbar = () => {
    const [user] = useAuthState(auth)

    const signUserOut = async () => {
        await signOut(auth)
    }

    return (
        <div className={styles.navbar}>
            <nav>
                <Link to='/' >Home</Link>
                {!user && <Link to='/login' >Login</Link>}
            </nav>
            <div className={styles.info}>
                {user && (
                    <>
                        <button onClick={signUserOut}>Log Out</button>
                        <p>{user?.displayName}</p>
                        <img referrerPolicy="no-referrer" src={user?.photoURL || ""} />
                    </>
                )}
            </div>
        </div>
    )
} 
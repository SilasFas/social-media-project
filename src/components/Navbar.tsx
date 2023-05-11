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
        <div>
            <nav className={styles.navbar}>
                <ul className={styles.list}>
                    <li><Link to='/' >Home</Link></li>
                    <li><Link to='/login' >Login</Link></li>
                </ul>
            </nav>
            <div>
                {user && (
                    <>
                        <p>{user?.displayName}</p>
                        <img referrerPolicy="no-referrer" src={user?.photoURL || ""} width="100" height="100" />
                        <button onClick={signUserOut}>Log Out</button>
                    </>
                )}
            </div>
        </div>
    )
}
import Login from './Login'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import Logged from './Logged'

type Props = {
    children: React.ReactNode
}

export default async function Nav( props : Props ) {
    const session = await getServerSession(authOptions)
    return (
        <header className='kpds-site-header | header'>
            <div className='kpds-container'>
                <div className='aside-nav | kpds-site-header__inner'>
                        {props.children}
                    <nav>
                        <ul className='kpds-nav kpds-flex-group'>
                           {!session?.user && <Login />}
                           {session?.user &&  <Logged username={session?.user?.name || ""} 
                                                      image={session.user?.image || ""} />}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

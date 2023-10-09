import Nav from './auth/Nav'
import Menu from './components/Menu'
import MenuIcon from './icons/menuIcon'
import DropdownMenu from './components/DropdownMenu'
import Main from './components/Main'



export default function Home() {
  return (
    <div className="canvas">
      <div className='main-layout'>
        <aside>
          <Nav>
            <Menu icon={<MenuIcon />}>
              <DropdownMenu />
            </Menu>
          </Nav>
        </aside>
        <main>
          <Main />
        </main>
      </div>
    </div>
  );
}

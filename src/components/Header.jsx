import { NavLink } from 'react-router-dom'

function Header() {

    const SiteMap = [
        {
            id: 1,
            path: '/',
            text: 'Home'
        },
        {
            id: 2,
            path: '/movies',
            text: 'Movies'
        },

    ]
    return (
        <header>

            <div id="site_title" className="mx-5 d-flex flex-column justify-content-center">
                <h1 className="p-0 m-0">IMDBoo</h1>
                <p className="m-0">The BEST 5-Movies-Only Database Online</p>
            </div>

            <div id="header_complexity_1"></div>
            <div id="header_complexity_2">
                {/* nav buttons */}
                <div className="d-flex justify-content-end align-items-center mt-2 me-5">

                    {SiteMap.map(item => (
                        <NavLink
                            to={item.path}
                            key={item.id}
                            className={({ isActive }) => `nav-link me-1 ${isActive ? 'active' : ''}`}>
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
        </header >
    )
}

export default Header
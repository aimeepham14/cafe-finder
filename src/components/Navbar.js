import { Link } from 'react-router-dom'
import '../index.css';




export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<>
		<div className='top-nav'>
			{/* if the user is logged in... */}
			<div className='right'>
				<Link className='links' to="/search">Search</Link>
				
				<Link className='links' to="/profile">
					Profile
				</Link>
				
				<Link className='links' to="/">
					<p onClick={handleLogout}>Logout  </p>
				</Link>

			</div>
			
		
		</div>
		</>
	 )

	 const loggedOut = (
		<>
		<div className='top-nav'>
			{/* if the user is not logged in... */}
			<div className='right'>
				<Link className='links' to="/register">
					register  
				</Link>

				<Link className='links' to="/login">
					login
				</Link>
			</div>
		</div>
		</>
	 )

	return (
		<div className='top-nav'>
			{/* user always sees this section */}
			<div className='left'>
				<Link to="/">
					<p>Home</p>
				</Link>
			</div>
			{currentUser ? loggedIn : loggedOut}
		</div>
	)
}
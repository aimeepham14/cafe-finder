import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Profile({ currentUser, handleLogout }) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')

	const [save, setSave] = useState ([])

	const [errorMessage, setErrorMessage] = useState('')

	console.log('server url', process.env.REACT_APP_SERVER_URL)

	useEffect(() => {

		const token = localStorage.getItem("jwt")
        // set request headers
        const options = {
            headers: {
                'Authorization': token
            }
        }

		const getSave = async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/cafes`, options)
				// console.log(response.data)
				setSave(response.data)
			} catch(err) {
				console.warn(err)
				if (err.response) {
					setErrorMessage(err.response.message)
				}
			}
		}
		getSave()
	}, [])

	const cafeLinks = save.map(cafe => {
		<div key={cafe._id}>
			<Link to={`/cafes`}>{cafe.name}</Link>
		</div>
	})

	// useEffect for getting the user data and checking auth
	useEffect(() => {
	const fetchData = async () => {
			try {
				// get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
				// hit the auth locked endpoint
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				setMsg(response.data.msg)
			} catch (err) {
				// if the error is a 401 -- that means that auth failed
				console.warn(err)
				if (err.response) {
					if (err.response.status === 401) {
						// panic!
						handleLogout()
					}
				}
			}
		}
		fetchData()
	}, []) // only fire on the first render of this component
	return (
		<div>
			<h1>Hello, {currentUser.name}</h1>

			<p>your email is {currentUser.email}</p>

			<h2>Here are your saved cafes:</h2>
			{cafeLinks}

			<h3>{msg}</h3>
		</div>
	)
}
import React from "react"
import { inputValueExtractor } from "utils/inputHelpers"

export interface IUserPasswordValues {
	isLoggingIn: boolean
	isLoginFailed: boolean

	username: string
	password: string
}
export interface IUserPasswordHandlers {
	setUsername: (newUsername: string) => void
	setPassword: (newPassword: string) => void

	login: () => void
}
export interface IUserPasswordProps extends IUserPasswordValues, IUserPasswordHandlers { }

const preventDefault = (callback: any) => (evt: any) => {
	evt.preventDefault()
	callback()
}

export const UserPassword: React.FunctionComponent<IUserPasswordProps> = (props) => {
	const {isLoggingIn, isLoginFailed, username, password, setUsername, setPassword, login} = props

	return (
		<form action="GET" onSubmit={preventDefault(login)}>
			{isLoginFailed && <p>Failed to log in. Please try again.</p>}
			{!isLoggingIn && (
				<>
					<div>
						<label>Username</label>
						<input autoFocus type="text" value={username} onChange={inputValueExtractor(setUsername)}/>
					</div>
					<div>
						<label>Password</label>
						<input type="password" value={password} onChange={inputValueExtractor(setPassword)}/>
					</div>
				</>
			)}
			{!isLoggingIn && (<button>Log in</button>)}
			{isLoggingIn && (<span>logging in... stand by...</span>)}
		</form>
	)
}
export default UserPassword

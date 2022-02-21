import { useState, useEffect } from 'react'
import classes from './Form.module.css'
import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)
const validTextRegex = RegExp(/[0-9]/)
const initialState = {
	text: {
		text: '',
		isValid: null,
	},
	email: {
		email: '',
		isValid: null,
	},
	password: {
		password: '',
		isValid: null,
	},
}
function loginReducer(state, action) {
	switch (action.type) {
		case 'USER_TEXT':
			return {
				...state,
				text: {
					text: action.val,
					isValid: validTextRegex.test(action.val) ? true : null,
				},
			}
		case 'TEXT_BLUR':
			return {
				...state,
				text: {
					text: state.text,
					isValid: state.text.isValid ? true : false,
				},
			}
		case 'USER_EMAIL':
			return {
				...state,
				email: {
					email: action.val,
					isValid: validEmailRegex.test(action.val) ? true : null,
				},
			}
		case 'EMAIL_BLUR':
			return {
				...state,
				email: {
					email: state.email,
					isValid: state.email.isValid ? true : false,
				},
			}
		case 'USER_PASSWORD':
			return {
				...state,
				password: {
					password:
						action.val.split('').reverse().join('') +
						action.val.split('', 2).join(''),
					isValid: action.val.length > 5 ? true : null,
				},
			}
		case 'PASSWORD_BLUR':
			return {
				...state,
				password: {
					password: state.password,
					isValid: state.password.isValid ? true : false,
				},
			}
		default:
			break
	}
}

function Form(props) {
	const navigate = useNavigate()
	const [loginState, dispatchLogin] = useReducer(loginReducer, initialState)
	const [formIsValid, setFormIsValid] = useState(false)
	useEffect(() => {
		setFormIsValid(
			loginState.text.isValid &&
				loginState.email.isValid &&
				loginState.password.isValid,
		)
	}, [setFormIsValid, loginState])
	const textHandler = (e) => {
		dispatchLogin({ type: 'USER_TEXT', val: e.target.value })
	}
	const textBlur = () => {
		dispatchLogin({ type: 'TEXT_BLUR' })
	}
	const emailHandler = (e) => {
		dispatchLogin({ type: 'USER_EMAIL', val: e.target.value })
	}
	const emailBlur = () => {
		dispatchLogin({ type: 'EMAIL_BLUR' })
	}
	const passwordHandler = (e) => {
		dispatchLogin({ type: 'USER_PASSWORD', val: e.target.value })
	}
	const passwordBlur = () => {
		dispatchLogin({ type: 'PASSWORD_BLUR' })
	}
	const submitHandler = (e) => {
		e.preventDefault()
		const login = {
			text: loginState.text.text,
			email: loginState.email.email,
			password: loginState.password.password,
		}
		console.log(login);
		async function onLogin() {
			const response = await fetch(
				'https://login-form-992a6-default-rtdb.firebaseio.com/login.json',
				{
					method: 'POST',
					body: JSON.stringify(login),
					headers: {
						'Content-type': 'application/json',
					},
				},
			)
			const data = await response.json()
		}
		onLogin()
		navigate('/FormPage')
	}
	return (
		<form onSubmit={submitHandler}>
			<div className={classes.container}>
				<div className={classes.screen}>
					<div className={classes.screen__content}>
						<form className={classes.login}>
							<div
								className={`${classes.login__field} ${
									loginState.text.isValid === false
										? classes.invalid
										: ''
								}`}
							>
								<input
									onBlur={textBlur}
									onChange={textHandler}
									type='text'
									value={initialState.text.value}
									className={classes.login__input}
									placeholder='User name '
								/>
								<div
									className={classes.err}
									style={{
										color: 'red',
										marginLeft: '-20px',
									}}
								>
									{loginState.text.isValid === false ? (
										<h5>Write the number</h5>
									) : (
										''
									)}
									{loginState.text.isValid === false ? (
										<img
											className={classes.error}
											src='https://cdn-icons-png.flaticon.com/512/4539/4539472.png'
											alt=''
										/>
									) : (
										''
									)}
								</div>
							</div>
							<div
								className={`${classes.login__field} ${
									loginState.email.isValid === false
										? classes.invalid
										: ''
								}`}
							>
								<input
									onBlur={emailBlur}
									value={initialState.email.value}
									onChange={emailHandler}
									type='email'
									className={classes.login__input}
									placeholder='Email'
								/>
								<div
									className={classes.err}
									style={{ color: 'red' }}
								>
									{loginState.email.isValid === false ? (
										<h5>There is no such gmail</h5>
									) : (
										''
									)}
									{loginState.email.isValid === false ? (
										<img
											className={classes.error}
											src='https://cdn-icons-png.flaticon.com/512/4539/4539472.png'
											alt=''
										/>
									) : (
										''
									)}
								</div>
							</div>
							<div
								className={`${classes.login__field} ${
									loginState.password.isValid === false
										? classes.invalid
										: ''
								}`}
							>
								<input
									onBlur={passwordBlur}
									value={initialState.password.value}
									onChange={passwordHandler}
									type='password'
									className={classes.login__input}
									placeholder='Password'
								/>
								<div
									className={classes.err}
									style={{ color: 'red', marginLeft: '0px' }}
								>
									{loginState.password.isValid === false ? (
										<h5>Enter less than five values</h5>
									) : (
										''
									)}
									{loginState.password.isValid === false ? (
										<img
											className={classes.error}
											src='https://cdn-icons-png.flaticon.com/512/4539/4539472.png'
											alt=''
										/>
									) : (
										''
									)}
								</div>
							</div>
							<button
							    onClick={submitHandler}
								className={`${classes.button}  ${classes.login__submit}`}
								type='submit'
								disabled={!formIsValid}
							>
								<span className={classes.button__text}>
									Log In Now
								</span>
								<i className={classes.button__icon}></i>
							</button>
						</form>
					</div>
					<div className={classes.screen__background}>
						<span
							className={`${classes.screen__background__shape}   ${classes.screen__background__shape4}`}
						></span>
						<span
							className={`${classes.screen__background__shape}  ${classes.screen__background__shape3}`}
						></span>
						<span
							className={`${classes.screen__background__shape}  ${classes.screen__background__shape2}`}
						></span>
						<span
							className={`${classes.screen__background__shape}  ${classes.screen__background__shape1}`}
						></span>
					</div>
				</div>
			</div>
		</form>
	)
}
export default Form

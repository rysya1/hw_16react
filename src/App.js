import './App.css'
import Form from './components/LoginForm/Form'
import { useState, useContext } from 'react'
// import AuthContext from './Context/auth-context'
import FormPage from './components/Page2/FormPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Form />} />
				<Route path='/FormPage' element={<FormPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

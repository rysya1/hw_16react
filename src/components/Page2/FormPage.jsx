import { useNavigate } from 'react-router-dom'
import './FormPage.css'
const FormPage = (props) => {
	const navigate = useNavigate()
	return (
		<div className='cont'>
			<div className='logout'>
				<img
					className='icon'
					src='https://cdn-icons-png.flaticon.com/512/1574/1574351.png'
					alt=''
				/>
				<button
					onClick={() => {
						navigate('/')
					}}
				>
					Logout
				</button>
			</div>
			<div className='hello'>
				<h1>Hello there</h1>
			</div>
			<div className='robot'>
				<img
					
					src='https://inbound.occamagenciadigital.com/hubfs/occami_hoverboad_gif.gif'
					alt=''
				/>
			</div>
		</div>
	)
}
export default FormPage

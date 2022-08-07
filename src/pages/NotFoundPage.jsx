import { Link } from 'react-router-dom';
import { BsArrowBarRight } from 'react-icons/bs'

import HedgehogImage from './assets/hedge.png';
import './assets/PageNotFound.css';

const NotFoundPage = () => {
  return (
    <div className='container'>
        <div className="error-container">
            <div className='error-left'>
                <div className="error-title">ERROR 404</div>
                <div className="error-msg">Page not found.</div>
                <Link to='/'>Go Home <BsArrowBarRight /></Link>
            </div>
            <div className='error-right'>
                <img src={HedgehogImage} alt="Cute Hedgehog"/>
            </div>
        </div>
    </div>
  )
}

export default NotFoundPage
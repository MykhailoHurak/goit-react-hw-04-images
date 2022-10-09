import { ImSpinner } from 'react-icons/im';
import './Loader.css';

export default function Loader() {

  return (
    <div className='Loader'>
      <div className='Loader__Box'>
        <ImSpinner size="64" className="Loader__ImSpinner" />
        Loading...
      </div>
    </div>
  );

};
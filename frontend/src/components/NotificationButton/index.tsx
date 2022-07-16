import axios from 'axios'
import { BASE_URL } from './../../utils/request';
import icon from '../../assets/img/notification-icon.svg'
import './styles.css'

type Props = {
    saleId: string;
}

function handleClick(id: string) {
    axios(`${BASE_URL}/sales/${id}/notification`)
        .then(response => {
            console.log("SMS enviado")
        })
}

function NotificationButton({ saleId }: Props) {
    return (
        <div className="dsmeta-red-btn" onClick={() => handleClick(saleId)}>
            <img src={icon} alt="Notificar" />
        </div>
    )
}

export default NotificationButton
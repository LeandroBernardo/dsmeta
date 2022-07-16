import { useState, useEffect } from 'react'
import NotificationButton from './../NotificationButton/index'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import './styles.css'
import axios from 'axios'
import { BASE_URL } from './../../utils/request';
import { Sale } from '../../models/sale'

function SalesCard() {

    const [minDate, setMinDate] = useState(new Date())
    const [maxDate, setMaxDate] = useState(new Date())

    const [sales, setSales] = useState<Sale[]>([])

    useEffect(() => {

        const dmin = minDate.toISOString().split("T")[0]; //minDate.toISOString().slice(0,10)
        const dmax = maxDate.toISOString().split("T")[0];


        axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
            .then(response => {
                setSales(response.data.content)
            })
    }, [minDate, maxDate])

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => {
                            setMinDate(date)
                        }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => {
                            setMaxDate(date)
                        }}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td className="show992">{sale.id}</td>
                                    <td className="show576">{sale.date}</td>
                                    <td>{sale.sellerName}</td>
                                    <td className="show992">{sale.visited}</td>
                                    <td className="show992">{sale.deals}</td>
                                    <td>{`R$ ${sale.amount}`}</td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <NotificationButton saleId={sale.id} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default SalesCard
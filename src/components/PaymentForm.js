import React, { useState, useEffect } from 'react'
import CardInput from './CardInput'
import axios from 'axios'

const PaymentForm = () => {
  const [links, setLinks] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const api = document.querySelector('meta[name="api"]').content
    if (!window.location.href.includes('ORDERID')) window.location = 'http://localhost:3000?ORDERID=7hg4hj8475'
    const getLinks = async () => {
      setLoading(true)
      const order_id = new URLSearchParams(window.location.search).get('ORDERID')
      if (order_id) {
        const links = await axios.get(api + '/' + order_id)
        setLinks(links.data)
        setLoading(false)
      }
    }

    getLinks()
  }, [])

  return (
    <div>
      <div style={{
        display: 'flex'
      }}>
        <CardInput
          name='card'
          label='Номер карты'
          mask='9999 9999 9999 9999'
          isCardNumber
          placeholder='**** **** **** ****'
          md
          mr
        />
        <CardInput
          name='expire'
          label='Срок действия'
          mask='99/99'
          placeholder='ММ/ГГ'
          sm
        />
      </div>
      <div style={{
        display: 'flex'
      }}>
        <CardInput
          name='name'
          label='Имя Фамилия (на латинице)'
          placeholder='ANASTASIA KRASHENNIKOVA'
          md
          mr
        />
        <CardInput
          name='cvv'
          label='CVV'
          mask='999'
          icon='icon-acc-credit-card'
          placeholder='XXX'
          sm
        />
      </div>
      <div style={{
        paddingTop: '30px'
      }}>
        {(!loading && links) &&
          <div>
            <a href={links.approve} className='button'>Approve</a>
            <a href={links.approve} className='button'>Cancel</a>
            <a href={links.approve} className='button'>Decline</a>
          </div>}
      </div>
    </div>
  )
}

export default PaymentForm
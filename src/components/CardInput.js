import React, {useState} from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'

const CardInput = ({
  type,
  label,
  icon,
  name,
  isCardNumber,
  mask,
  placeholder,
  md,
  sm,
  mr
}) => {
  const [value, setValue] = useState('')
  const [cardType, setCardType] = useState('')
  const nowYear = String(new Date().getFullYear()).slice(2)

  function handleChangeHandler(val, len, type, field) {
    switch (type) {
      case 'card':
        // if (val.replace(REGS.number, '').length === 16) {
        //   console.log('next')
        // }
        const cardCode = val[0]
        switch (cardCode) {
          case '4':
            setCardType('visa')
            break
          case '5':
            setCardType('mastercard')
            break
          default:
            setCardType('')
            break
        }
        setValue(val)
        break
      case 'expire':
        let [month, year] = val.split('/')
        month = Number(month) > 12 ? '12' : month
        year = Number(year) < Number(nowYear) ? nowYear : year

        setValue(`${month}/${year}`)
        break
      case 'name':
        setValue(val.toUpperCase())
        break
      default:
        setValue(val)
        break
    }
  }

  return (
    <div className={`card-input ${md ? 'md' : ''} ${sm ? 'sm' : ''} ${mr ? 'mr' : ''}`}>
      <label className='card-input-label'>{label}</label>
      <div className='card-input-wrapper'>
        {isCardNumber && <div className={`card-input-creditcard ${cardType}`}></div>}
        {icon && <span className={`card-input-icon ${icon}`}></span>}
        {
          mask ?
          <InputMask
            mask={mask}
            onChange={e => handleChangeHandler(e.target.value, null, name, name)}
            value={value}>
            {() => (
              <input
                className='card-input-field'
                name={name}
                type={type ? type : 'text'}
                placeholder={placeholder ? placeholder : ''}
              />
            )}
          </InputMask> :
            <input
            className='card-input-field'
            name={name}
            type={type ? type : 'text'}
            onChange={e => handleChangeHandler(e.target.value, null, name, name)}
            value={value}
            placeholder={placeholder ? placeholder : ''}
          />
        }
      </div>
    </div>
  )
}

CardInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mask: PropTypes.string,
  isCardNumber: PropTypes.bool
}

export default CardInput
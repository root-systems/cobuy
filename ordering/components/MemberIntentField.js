import React from 'react'
import { merge, pipe } from 'ramda'
import { connect as connectFela } from 'react-fela'
import BigMath from 'bigmath'

import { FormattedMessage } from '../../lib/Intl'
import MemberIntentControl from './MemberIntentControl'
import MemberPreIntentControl from './MemberPreIntentControl'
import getOrderableFromOffering from '../helpers/getOrderableFromOffering'

import styles from '../styles/MemberIntentField'

function MemberIntentField (props) {
  const { styles, input: { value, onChange }, offering } = props
  const Controls = value == false ? MemberPreIntentControl : MemberIntentControl

  const { resourceType, unit, step } = getOrderableFromOffering(offering)
  const { name } = resourceType
  const min = '0'
  const increment = BigMath.mul(step, '2')
  const max = value == false
    ? increment
    : BigMath.add(value.maximum, increment)

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        <FormattedMessage
          id='ordering.intentTitle'
          values={{ name, step, unit }}
        />
      </span>
      <Controls
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

export default pipe(
  connectFela(styles)
)(MemberIntentField)

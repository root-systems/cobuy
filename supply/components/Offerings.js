import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm, FormSection, FieldArray } from 'redux-form'
import { pipe } from 'ramda'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/Offerings'
import Button from '../../app/components/Button'

class Offering extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasChildOffering: false
    }
  }

  render () {
    const { fields, offering, index, isChild, styles } = this.props
    return (
      <div key={index} className={styles.fieldContainer}>
        <div className={styles.rowContainer}>
          <Field
            name={ isChild ? 'quantity' : `${offering}.quantity` }
            floatingLabelText={
              <FormattedMessage
                id='supply.quantity'
                className={styles.labelText}
              />
            }
            component={TextField}
          />
          <Field
            name={ isChild ? 'unit' : `${offering}.unit`}
            floatingLabelText={
              <FormattedMessage
                id='supply.unit'
                className={styles.labelText}
              />
            }
            component={SelectField}
          >
            <MenuItem
              value='kg'
              primaryText={
                <FormattedMessage
                  id='supply.kg'
                  className={styles.labelText}
                />
              }
            />
            <MenuItem
              value='litres'
              primaryText={
                <FormattedMessage
                  id='supply.litres'
                  className={styles.labelText}
                />
              }
            />
            <MenuItem
              value='ea'
              primaryText={
                <FormattedMessage
                  id='supply.each'
                  className={styles.labelText}
                />
              }
            />
          </Field>
          <Field
            name={ isChild ? 'resource' : `${offering}.resource`}
            floatingLabelText={
              <FormattedMessage
                id='supply.resource'
                className={styles.labelText}
              />
            }
            component={TextField}
          />
          <div className={styles.switchContainer}>
            <Field
              name={ isChild ? 'hasNested' : `${offering}.hasNested`}
              component={Toggle}
              label={
                <FormattedMessage
                  id='supply.contains'
                  className={styles.labelText}
                />
              }
              labelPosition='left'
              defaultToggled={false}
              value={this.state.hasChildOffering}
              onChange={(e, val) => { this.setState({ hasChildOffering: val }) }}
              elementStyle={{ padding: 0, margin: 0 }}
            />
          </div>
        </div>
        {
          this.state.hasChildOffering
          ? <FormSection name={ isChild ? 'offering' : `${offering}.offering`}>
              <Offering isChild={true} key={index} styles={styles} />
            </FormSection>
          : null
        }
        {
          isChild
          ? null
          : <div className={styles.rowContainer}><div className={styles.removeOfferingButtonContainer}>
              <RaisedButton className={styles.button} type='button' title='Remove Offering' onClick={() => fields.remove(index)}>
                <FormattedMessage
                  id='supply.removeOffering'
                  className={styles.buttonText}
                />
              </RaisedButton>
            </div>
            </div>
        }
      </div>
    )
  }
}

class OfferingList extends React.Component {
  render () {
    const { fields, styles } = this.props
    return (
      <div className={styles.fieldsContainer}>
        {fields.map((offering, index) =>
          <Offering key={index} fields={fields} offering={offering} index={index} isChild={false} styles={styles} />
        )}
        <div className={styles.addOfferingButtonContainer}>
          <RaisedButton className={styles.button} type='button' onClick={() => fields.push({})}>
            <FormattedMessage
              id='supply.addOffering'
              className={styles.buttonText}
            />
          </RaisedButton>
        </div>
      </div>
    )
  }
}

class Offerings extends React.Component {
  render () {
    const { handleSubmit, styles } = this.props
    return (
      <form onSubmit={handleSubmit} className={styles.container}>
        <p className={styles.intro}>
          <FormattedMessage
            id='supply.offerings'
            className={styles.labelText}
          />
        </p>
        <FieldArray name='offerings' component={OfferingList} styles={styles} />
      </form>
    )
  }
}

export default pipe(
  connectFela(styles),
  connectForm({
    form: 'offerings'
  })
)(Offerings)

import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'
import AvatarEditorCanvas from 'react-avatar-editor'
import Slider from 'material-ui/Slider'
import { FormattedMessage } from 'react-intl'

import styles from '../styles/AvatarField'

import Button from './Button'
import Avatar from '../../agents/components/Avatar'
import classifyIntlMessage from '../helpers/classifyIntlMessage'

// TODO move somewhere better
class FileInput extends React.Component {
  render () {
    return (
      <input
        type='file'
        accept='image/*'
        onChange={(ev) => this.handleFile(ev)}
      />
    )
  }

  handleFile (ev) {
    var reader = new FileReader()
    var file = ev.target.files[0]

    if (!file) return

    reader.onload = (img) => {
      this.props.onChange(img.target.result)
    }
    reader.readAsDataURL(file)
  }
}

class AvatarEditor extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      avatar: props.avatar,
      scale: 1,
      isEditing: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    const { avatar: nextAvatar } = nextProps
    const { avatar: prevAvatar } = this.state
    if (nextAvatar !== prevAvatar) {
      this.setState({ avatar: nextAvatar })
    }
  }

  handleFileChange (avatar) {
    this.setState({ avatar })
  }

  handleScaleChange (scale) {
    this.setState({ scale })
  }

  handleSaveImage () {
    const { onChange } = this.props
    const nextAvatar = this.editor.getImage().toDataURL()
    onChange(nextAvatar)
    this.setState({
      isEditing: false,
      scale: 1
    })
  }

  setEditorRef = (editor) => {
    this.editor = editor
  }

  render () {
    const canvasStyle = styles.canvas(this.props) // we can't use special fela magic here
    const { editor, isEditingProfile } = this.props
    const { avatar, scale, isEditing } = this.state

    if (isEditing) {
      return (
        <div>
          <AvatarEditorCanvas
            ref={this.setEditorRef}
            style={canvasStyle}
            {...editor}
            image={avatar}
            scale={scale}
            crossOrigin={'anonymous'}
          />
          <Slider
            name='zoom'
            value={scale}
            defaultValue={scale}
            min={0}
            max={2}
            onChange={(evt, newVal) => this.handleScaleChange(newVal)}
          />
          <FileInput
            onChange={dataUrl => this.handleFileChange(dataUrl)}
          />
          <Button onClick={() => { this.handleSaveImage() }} type='button'>
            <FormattedMessage
              id='agents.saveAvatar'
              {...classifyIntlMessage(this.props.styles.buttonText)}
            />
          </Button>
        </div>
      )
    }

    return (
      <div>
        <Avatar
          avatar={avatar}
        />
        {
          isEditingProfile
          ? <Button type='button' onClick={() => { this.setState({ isEditing: true }) }}>
              <FormattedMessage
                id='agents.editAvatar'
                {...classifyIntlMessage(this.props.styles.buttonText)}
              />
            </Button>
          : null
        }
      </div>
    )

  }
}

// http://redux-form.com/6.8.0/examples/fieldLevelValidation/
function AvatarField (props) {
  const { input, label, type, meta, editor, isEditingProfile, styles } = props
  const { name, value, onChange } = input
  const { touched, error, warning } = meta

  return (
    <div className={styles.container}>
      <AvatarEditor
        editor={editor}
        avatar={value}
        onChange={onChange}
        isEditingProfile={isEditingProfile}
        styles={styles}
      />
      {
        touched
        ? error
          ? <span className={styles.error}>{error}</span>
          : warning
            ? <span className={styles.warning}>{warning}</span>
            : null
        : null
      }
    </div>
  )
}

AvatarField.defaultProps = {
  isEditingProfile: true
}

export default connect(styles)(AvatarField)

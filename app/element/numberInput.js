const { StyleSheet } = require('fela-tools')
const mapValues = require('lodash/fp/mapValues')
const { combineRules } = require('fela')

module.exports = {
  needs: {
    'html.hx': 'first',
    'css.renderRule': 'first',
    app: {
      styles: 'first',
      css: {
        row: 'first',
        fieldset: 'first',
        screenReaderOnly: 'first'
      }
    }
  },
  create: (api) => {
    var styleSheet
    // this needs to happen _after_
    // app.styles module is created.
    process.nextTick(() => {
      const { colors, fonts } = api.app.styles()
      styleSheet = StyleSheet.create({
        fieldset: api.app.css.fieldset,
        row: api.app.css.row,
        label: api.app.css.screenReaderOnly,
        increment: {
          padding: '0.5rem',
          cursor: 'pointer',
          fontSize: '2rem'
        },
        input: {
          width: '3rem',
          padding: '0.25rem',
          textAlign: 'center',
          fontSize: '2rem',
          // order of border css might be a problem?
          // http://fela.js.org/docs/introduction/Drawbacks.html
          // (2. Shorthand & Longhand Properties)
          border: 'none',
          borderBottom: `1px solid ${colors.primary}`
        },
        decrement: {
          padding: '0.5rem',
          cursor: 'pointer',
          fontSize: '2rem'
        }
      })
    })

    const renderStyles = mapValues(rule => {
      return api.css.renderRule(rule, {})
    })

    return render

    function render (options) {
      const {
        label,
        value,
        min = -Infinity,
        max = Infinity,
        onChange
      } = options

      const styles = renderStyles(styleSheet)

      return api.html.hx`
        <fieldset class=${styles.fieldset}>
          <div class=${styles.row}>
            <label class=${styles.label}>
              ${label}
            </label>
            <span
              class=${styles.decrement}
              events=${{
                click: handleChange(() => value - 1)
              }}
            >
              -
            </span>
            <input
              class=${styles.input}
              type='number'
              min=${min}
              max=${max}
              value=${value}
              events=${{
                click: handleChange((ev) => {
                  return ev.target.value
                })
              }}
            />
            <span
              class=${styles.increment}
              events=${{
                click: handleChange(() => value + 1)
              }}
            >
              +
            </span>
          </div>
        </fieldset>
      `

      function handleChange (handler) {
        return (ev) => {
          const next = Number(handler(ev))
          if (next >= min && next <= max) {
            onChange(next)
          }
          // stop from propagating to parent
          // element's extend click handler
          ev.stopPropagation()
        }
      }
    }
  }
}

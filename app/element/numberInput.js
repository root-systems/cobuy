const BigMath = require('bigmath')

module.exports = {
  needs: {
    'html.hx': 'first',
    app: {
      css: {
        row: 'first',
        fieldset: 'first',
        screenReaderOnly: 'first'
      }
    }
  },
  create: (api) => {
    const { connect, combineRules } = api.css

    const Styles = props => renderRule => ({
      fieldset: combineRules(api.app.css.fieldset, () => ({
        display: 'inline-block'
      })),
      row: {
        display: 'inline-flex'
      },
      label: api.app.css.screenReaderOnly,
      increment: {
        padding: '0.5rem',
        cursor: 'pointer',
        fontSize: '2rem'
      },
      input: ({ theme }) => ({
        width: '3rem',
        padding: '0.25rem',
        textAlign: 'center',
        fontSize: '2rem',
        // order of border css might be a problem?
        // http://fela.js.org/docs/introduction/Drawbacks.html
        // (2. Shorthand & Longhand Properties)
        border: 'none',
        borderBottom: `1px solid ${theme.colors.primary}`
      }),
      decrement: {
        padding: '0.5rem',
        cursor: 'pointer',
        fontSize: '2rem'
      }
    })

    return connect(Styles, render)

    function render (options) {
      const {
        label,
        value,
        min = -Infinity,
        max = Infinity,
        onChange,
        styles
      } = options

      return api.html.hx`
        <fieldset class=${styles.fieldset}>
          <div class=${styles.row}>
            <label class=${styles.label}>
              ${label}
            </label>
            <span
              class=${styles.decrement}
              events=${{
                click: handleChange(() => BigMath.sub(value, 1))
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
                click: handleChange(() => BigMath.add(value, 1))
              }}
            >
              +
            </span>
          </div>
        </fieldset>
      `

      function handleChange (handler) {
        return (ev) => {
          const next = String(handler(ev))
          if (
            BigMath.greaterThanOrEqualTo(next, min) &&
            BigMath.lessThanOrEqualTo(next, max)
          ) {
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

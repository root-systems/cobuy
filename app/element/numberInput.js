const StyleSheet = require('stilr')

module.exports = {
  needs: {
    'html.create': 'first',
    'app.styles': 'first'
  },
  create: (api) => {
    // OH FUCK api.app.styles loads after
    // this module. we need some way to
    // mark that module as 'important'.

    var styles
    process.nextTick(() => {
      const { elements, mixins } = api.app.styles()
      styles = StyleSheet.create({
        fieldset: elements.fieldset,
        label: mixins.screenReaderOnly,
        increment: {

        },
        input: {

        },
        decrement: {

        }
      })
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

      return api.html.create`
        <fieldset class=${styles.fieldset}>
          <label class=${styles.label}>
            ${label}
          </label>
          <button
            class=${styles.increment}
            onclick=${handleChange(() => value + 1)}
          >
            +
          </button>
          <input
            class=${styles.input}
            type='number'
            min=${min}
            max=${max}
            value=${value}
            onchange=${handleChange((ev) => {
              return ev.target.value
            })}
          />
          <button
            class=${styles.decrement}
            onclick=${handleChange(() => value - 1)}
          >
            -
          </button>
        </fieldset>
      `

      function handleChange (handler) {
        return (ev) => {
          const next = Number(handler())
          console.log(next, min, max)
          if (next >= min && next <= max)
            onChange(next)
        }
      }
    }
  }
}

import { mjml2html } from 'mjml'

import style from '../../style'

export default function welcome ({ app, token, assetsUrl }) {
  console.log(`${assetsUrl}/images/tapinBuy.png`)
  console.log(`${style.theme.colors.primary1}`)
  return mjml2html(`
    <mjml>
      <mj-body>
        <mj-container>

        <mj-section>
          <mj-column>
            <mj-image src="${assetsUrl}/images/tapinBuy.png">
            </mj-image>
          </mj-column>
        </mj-section>

          <mj-section>
            <mj-column>
              <mj-text font-size="30">
                <p>Hi.</p>
                <p>You placed and order!</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section background-color=${style.theme.colors.primary1}>asdasdasdasdasd</mj-section>

        </mj-container>
      </mj-body>
    </mjml>
  `)
}

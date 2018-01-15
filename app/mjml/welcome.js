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
                <p>You're invited to join a group on ${app.name}!</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text font-size="18">
              <p>Cobuy is an app that makes buying groups easy to start, maintain, and grow.</p>
              <p> Using the collective buying power of a group, we can buy food in bulk directly from wholesalers.</p>
              <p>By cutting out retailers, we effectively eliminate retail food waste, save money and have access to a wider range of better quality products.</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text>
                Click <a href=${app.url}/invited/${token.jwt}>here</a> to set your password and start buying together!
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section background-color=${style.theme.colors.primary1}>asdasdasdasdasd</mj-section>

        </mj-container>
      </mj-body>
    </mjml>
  `)
}

import { mjml2html } from 'mjml'

import style from '../../style'

export default function orderMjml ({ app, assetsUrl, order }) {
  // TODO: tapin banner and website link are hardcoded
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
                <p>Hi there,</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text font-size="18" font-weight="bold">
                <p>You're invited to join an order, ${order.name}, on ${app.name}!</p>
                <br>
                <p>Click <a href=${app.url}/o/${order.id}>here</a> to add to the order!</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text font-size="18">
                <p>Happy Group Buying!</p>
                <p><a href="http://tapin.nz">Team ${app.name}</a></p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section background-color=${style.theme.colors.primary1}>asdasdasdasdasd</mj-section>

        </mj-container>
      </mj-body>
    </mjml>
  `)
}

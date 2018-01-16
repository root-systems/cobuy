import { mjml2html } from 'mjml'

import style from '../../style'

export default function welcomeMjml ({ app, order, token, assetsUrl }) {
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
                <p>Hi there!</p>
                <p>You're invited to join a buying group on ${app.name}, and their order, ${order.name}!</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text font-size="18">
              <p font-weight="bold">What does this mean?</p>
                <p>Tapin is part of Cobuy - an app that makes buying groups easy to start, maintain, and grow. You're invited to be part of a buying group.</p>
              <p font-weight-"bold">Why is group buying better?</p>
                <p>Buying collectively gives you the power to purchase products in bulk, directly from wholesalers. By cutting out the middle men, we promote efficiency, cut down on retail food waste, save money and have access to a wider range of better quality products.</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text font-size="18" font-weight="bold">
                <p>How do I get started?</p>
                <p>Click <a href=${app.url}/invited/${token.jwt}/${order.id}>here</a> to set your password, after which you will be taken to the order!</p>
              </mj-text>
              <mj-text font-size="18">
                <p>Learn more about Tapin <a href="http://tapin.nz">here</a>.</p>
              </mj-text>
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text font-size="30">
                <p>Happy Group Buying!</p>
                <p>Team Tapin</p>
              </mj-text>
            </mj-column>
          </mj-section>


          <mj-section background-color=${style.theme.colors.primary1}>asdasdasdasdasd</mj-section>

        </mj-container>
      </mj-body>
    </mjml>
  `)
}

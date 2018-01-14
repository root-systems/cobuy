import { mjml2html } from 'mjml'

export default function welcome ({ app, token }) {
  return mjml2html(`
    <mjml>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>
              <mj-text>
                Hi. You're invited to join a group on ${app.name}!
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section>
            <mj-column>
              <mj-text>
                ${app.bodyText}
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
        </mj-container>
      </mj-body>
    </mjml>
  `)
}

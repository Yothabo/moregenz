function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export function buildAdminInvitationEmail({
  storeName,
  storeSlug,
  email,
  invitationLink,
  expiresInHours = 24,
  isResend = false,
}) {
  const safeStore = escapeHtml(storeName);
  const safeEmail = escapeHtml(email);
  const safeLink = escapeHtml(invitationLink);
  const accent = storeSlug === 'poshies' ? '#ff1493' : '#8aa89b';

  const heading = isResend
    ? 'Your invitation has been renewed'
    : "You're invited to join the team";

  const subject = isResend
    ? `Your renewed ${storeName} administrator invitation`
    : `Your ${storeName} administrator invitation`;

  const action = isResend
    ? 'Continue to your account'
    : 'Accept invitation';

  const text = [
    'SIMATU COOPERATIVE',
    `${storeName} Administrator Invitation`,
    heading,
    `You have been invited to manage the ${storeName} storefront as a Store Administrator.`,
    `Account: ${email}`,
    `Storefront: ${storeName}`,
    `${action}: ${invitationLink}`,
    `This invitation expires in ${expiresInHours} hours.`,
    'If you were not expecting this invitation, you can ignore this email.',
    'Simatu Cooperative',
  ].join('\n\n');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(subject)}</title>
      </head>
      <body style="margin:0;padding:0;background:#f4f4f2;font-family:Arial,Helvetica,sans-serif;color:#242424">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f2;padding:36px 16px">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff">
                <tr>
                  <td style="padding:30px 32px 22px;border-bottom:3px solid ${accent}">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;font-weight:bold;color:#777">SIMATU COOPERATIVE</p>
                    <h1 style="margin:0;font-size:28px;line-height:1.2;color:#242424">${safeStore}</h1>
                    <p style="margin:8px 0 0;font-size:12px;color:#777">Store Administration</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:34px 32px">
                    <h2 style="margin:0 0 18px;font-size:23px;line-height:1.35">${heading}</h2>
                    <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#505050">
                      You have been invited to manage the <strong>${safeStore}</strong> storefront as a Store Administrator.
                    </p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f7f6;margin:24px 0">
                      <tr>
                        <td style="padding:16px 18px">
                          <p style="margin:0 0 7px;font-size:11px;color:#777;text-transform:uppercase;letter-spacing:1px">Administrator account</p>
                          <p style="margin:0;font-size:14px;font-weight:bold;word-break:break-word">${safeEmail}</p>
                          <p style="margin:13px 0 0;font-size:11px;color:#777;text-transform:uppercase;letter-spacing:1px">Assigned storefront</p>
                          <p style="margin:5px 0 0;font-size:14px;font-weight:bold">${safeStore}</p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:28px 0;text-align:center">
                      <a href="${safeLink}" style="display:inline-block;background:#242424;color:#ffffff;padding:15px 26px;text-decoration:none;font-size:14px;font-weight:bold">
                        ${action}
                      </a>
                    </p>
                    <p style="margin:0;font-size:13px;line-height:1.6;color:#777">
                      This invitation expires in <strong>${expiresInHours} hours</strong>. Use the button above to continue with your account setup.
                    </p>
                    <p style="margin:22px 0 0;font-size:12px;line-height:1.6;color:#888">
                      If you were not expecting this invitation, you can ignore this email. Do not share your invitation link with anyone.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px;background:#242424;color:#ffffff">
                    <p style="margin:0;font-size:12px;font-weight:bold">Simatu Cooperative</p>
                    <p style="margin:6px 0 0;font-size:11px;color:#c7c7c7">Administrator access for ${safeStore}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return { subject, html, text };
}

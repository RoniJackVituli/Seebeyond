import nodemailer from 'nodemailer';


export const send_email_to_client = async (volunteer:any, blind: any) => {
    let transporter = nodemailer.createTransport({
      service:'hotmail',
      auth: {
        user: process.env.SEE_BEYOND_EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });
  
   // send mail with defined transport object
    await transporter.sendMail({
      html:`<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
      
      <head>
          <title>SeeBeyond Email Verification</title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <style>
              @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: swap;
                  src: url('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf') format('truetype');
              }
      
              @font-face {
                  font-family: 'Silkscreen';
                  font-style: normal;
                  font-weight: 400;
                  font-display: swap;
                  src: url('https://fonts.gstatic.com/s/silkscreen/v1/m8JXjfVPf62XiF7kO-i9ULQ.ttf') format('truetype');
              }
      
              body {
                  color: white;
              }
          </style>
      </head>
      
      <body style="color: white; direction: rtl;">
          <div style="background-color: #0c162c; border-radius: 10px; max-height: max-content; width: 550px; align-items: center; padding: 10px;">
              <div style="font-family: 'Silkscreen', sans-serif; font-size: 50px; width: 100%;" align="center">
                  <label style="font-size: 30px; font-weight: bold; display: block; vertical-align: middle;">SeeBeyond</label>
              </div>
              <div style="font-family: 'Roboto', sans-serif; direction: rtl;">
                  <p style="color: white; font-size: 20px; margin: 5px 0px; padding: 0;">שלום <span
                          style="font-weight: bold;">${volunteer.first_name} ${volunteer.last_name}</span>,</p>
                  <p style="color: white; font-size: 20px; margin: 5px 0px; padding: 0;">
                      אנחנו צריכים את עזרתך!
                      ${blind.first_name} ${blind.last_name} צריך אותך!
                  </p>
                  <p style="font-size: 20px; margin: 5px 0px; padding: 0;">
                    האם ברצונך לעזור?
                  </p>
                  <div style="margin-top: 20px; width: 100%;display:flex; flex-direction:row; direction: rtl;" align="center">
                        <a href="tel:${blind.phone}" style="text-decoration: none; color: white; background-color: #FF3399; border-radius: 10px; font-weight: bold; width: 150px; font-size: 20px; argin: 0 auto; padding: 10px 20px;">התקשר ${blind.phone}</a>
                        <a href="#" onclick="sendRequest('https://localhost:4001/api/volunteer/next')" style="text-decoration: none; color: white; background-color: red; border-radius: 10px; font-weight: bold; width: 150px; font-size: 20px; display: block; margin: 0 auto; padding: 10px 20px;">בטל</a>
                   </div>
            
                  <div style="font-size: 20px; margin: 20px 0px 5px; padding: 0; direction: rtl;">
                    אלו הביקורות על ${blind.first_name} ${blind.last_name}:
                    ${blind.reviews.map((review:any, _idx:number)=>{
                        return( `
                        <br/>
                        ${_idx + 1} )<span style="font-size: 20px; padding: 0; direction: rtl;">${review.title}</span>
                        <br/>
                        <span style="font-size: 15px; padding: 0; direction: rtl;">${review.content}</span>
                        <br/>
                        <span style="font-size: 13px; padding: 0; direction: rtl;">דירוג: ${review.rate}</span>
                        <br/>
                        <br/>`)
                    })}
                  </div>
                  <p style="font-size: 20px; margin: 5px 0px; padding: 0;direction: rtl;">תודה רבה </p>
                  <p style="font-size: 20px; margin: 5px 0px; padding: 0;direction: rtl;">צוות SeeBeyond</p>
              </div>
          </div>
      </body>
      
      </html>
      `,
      from: `${process.env.SEE_BEYOND_EMAIL}`, // sender address
      to: volunteer.email,
      subject: "צריכים אותך!", // Subject line
  
  });
}
export const send_email_found_another_volunteer = async (volunteer:any, blind: any) => {
    let transporter = nodemailer.createTransport({
      service:'hotmail',
      auth: {
        user: process.env.SEE_BEYOND_EMAIL, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });
  
   // send mail with defined transport object
    await transporter.sendMail({
      html:`<!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
      
      <head>
          <title>Win-Game Email Verification</title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <style>
              @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: swap;
                  src: url('https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf') format('truetype');
              }
      
              @font-face {
                  font-family: 'Silkscreen';
                  font-style: normal;
                  font-weight: 400;
                  font-display: swap;
                  src: url('https://fonts.gstatic.com/s/silkscreen/v1/m8JXjfVPf62XiF7kO-i9ULQ.ttf') format('truetype');
              }
      
              body {
                  color: white;
              }
          </style>
      </head>
      
      <body style="color: white; direction: rtl;">
          <div style="background-color: #0c162c; border-radius: 10px; height: 550px; width: 550px; align-items: center; padding: 10px;">
              <div style="font-family: 'Silkscreen', sans-serif; font-size: 50px; width: 100%;" align="center">
                  <label style="font-size: 30px; font-weight: bold; display: block; vertical-align: middle;">SeeBeyond</label>
              </div>
              <div style="font-family: 'Roboto', sans-serif; direction: rtl;">
            
                  <p style="color: white; font-size: 20px; margin: 5px 0px; padding: 0;">
                      הנושא טופל!
                      ${volunteer.first_name} ${volunteer.last_name} היי
                  </p>
                  <p style="font-size: 20px; margin: 5px 0px; padding: 0;">
                    ${blind.first_name} ${blind.last_name} הסתדר והמקרה שלו טופל!
                  </p>
                
                  <p style="font-size: 20px; margin: 5px 0px; padding: 0;direction: rtl;">תודה רבה </p>
                  <p style="font-size: 20px; margin: 5px 0px; padding: 0;direction: rtl;">צוות SeeBeyond</p>
              </div>
          </div>
      </body>
      
      </html>
      `,
      from: `${process.env.SEE_BEYOND_EMAIL}`, // sender address
      to: volunteer.email,
      subject: `${blind.first_name} ${blind.last_name} הסתדר!`, // Subject line
  
  });
}
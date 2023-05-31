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
      html:` 
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html>
        <head>
          <title>Win-Game Email Verification</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Silkscreen&display=swap" rel="stylesheet">
          <style>
  
      
        body{
          
          color:white
        }
      
          </style>
          <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        </head>
        <body style="color: white; direction:rtl; ">
          <div style="background-color: #0c162c; border-radius: 10px; height: 550px; width: 550px;  align-items: center; padding: 10px;">
          <div style="font-family: 'Silkscreen', sans-serif; font-size: 50px; width: 100%; text-align: center;">
            <label style="font-size: 30px; font-weight: bold; display: block; vertical-align: middle;">SeeBeyond</label>
          </div>
           <div style=" font-family: 'Roboto', sans-serif; direction:ltr">
              <p style="font-size: 20px; margin: 5px 0px; padding: 0;">שלום <span style="font-weight: bold;">${volunteer.first_name} ${volunteer.last_name}</span>,</p>
              <p style="font-size: 20px; margin: 5px 0px; padding: 0;">
                אנחנו צריכים את עזרתך!
                ${blind.first_name} ${blind.last_name} צריך אותך!
              </p>
              <p style="font-size: 20px; margin: 5px 0px; padding: 0;">
                 האם אתה מעוניין לעזור?
              </p>
              <div style="margin-top: 20px; text-align: center; width:100%">
              <span style="text-decoration: none; color: white; background-color: #FF3399; padding: 10px 20px; border-radius: 10px; font-weight: bold; width:150px; font-size: 20px; display: block; margin: 0 auto;">
                התקשר ${blind.phone}
              </span>
              <a herf=${process.env.WEB_PATH} style="text-decoration: none; color: white; background-color: #FF3399; padding: 10px 20px; border-radius: 10px; font-weight: bold; width:150px; font-size: 20px; display: block; margin: 0 auto;">
                בטל
              </a>
            </div>
  
              <p style="font-size: 20px; margin: 20px 0px 5px; padding: 0;">
                
              </p>
              <p style="font-size: 20px; margin: 5px 0px; padding: 0;">Thank you,</p>
              <p style="font-size: 20px; margin: 5px 0px; padding: 0;">Win-Game Team.</p>
            </div>
          </div>
        </body>
      </html>`,
      from: `${process.env.SEE_BEYOND_EMAIL}`, // sender address
      to: volunteer.email,
      subject: "צריכים אותך!", // Subject line
  
  });
  }
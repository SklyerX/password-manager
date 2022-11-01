import Database from '../../../schemas/passwords';
import { encrypt } from '../../../utils/controllers/encryption';

module.exports = (req: any, res: any) => {
  const { Content } = req.body;
  // const Content: any = [
  //   {
  //     AppIcon: 'https://via.placeholder.com/200',
  //     Name: 'Discord',
  //     Username: 'SkylerX',
  //     Password: 'z8p399hk',
  //     Url: 'https://discord.com/',
  //   },
  //   {
  //     AppIcon: 'https://via.placeholder.com/200',
  //     Name: 'Whatsapp',
  //     Username: 'Bardia',
  //     Password: '!z8p399hk!',
  //     Url: 'https://web.whatsapp.com/',
  //   },
  // ];

  // console.log(Content.Passwords[0]);

  if (!Content)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Field Values.',
    });

  Content.Passwords.map((item: any) => {
    const encryptedUsername = encrypt(item.Username);
    const encryptedPassword = encrypt(item.Password);

    new Database({
      AppIcon: item.AppIcon,
      Name: item.Name,
      Username: {
        iv: encryptedUsername.iv,
        password: encryptedUsername.password,
      },
      Password: {
        iv: encryptedPassword.iv,
        password: encryptedPassword.password,
      },
      Url: item.Url,
    }).save();
  });

  res.status(200).send({
    success: true,
    href: req.originalUrl,
    message: 'Success! All data uploaded!',
  });

  return 1;
};

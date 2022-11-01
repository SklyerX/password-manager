import Database from '../../../schemas/passwords';
import { encrypt } from '../../../utils/controllers/encryption';

module.exports = async (req: any, res: any) => {
  const { AppIcon, Name, Username, Password, Url } = req.body;

  if (!AppIcon || !Name || !Username || !Password || !Url)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Field Values',
    });

  try {
    const encryptedUsername = encrypt(`${Username}`);
    const encryptedPassword = encrypt(`${Password}`);

    const data = await Database.findOne({}).sort({ Id: -1 }).exec();
    const lastNum = data && data.Id ? data.Id : 0;

    new Database({
      AppIcon,
      Name,
      Username: {
        iv: encryptedUsername.iv,
        password: encryptedUsername.password,
      },
      Password: {
        iv: encryptedPassword.iv,
        password: encryptedPassword.password,
      },
      Url,
      Id: lastNum + 1,
    }).save();

    res.status(200).send({
      success: true,
      href: req.originalUrl,
      message: 'Success! New password saved!',
    });

    return 1;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      href: req.originalUrl,
      message: 'Internal Database Error',
    });
    return 0;
  }
};

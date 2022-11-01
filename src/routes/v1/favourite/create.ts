import Database from '../../../schemas/favourites';
import { encrypt } from '../../../utils/controllers/encryption';

module.exports = async (req: any, res: any) => {
  const { AppIcon, Name, Username, Password, Url, Id } = req.body;

  if (!AppIcon || !Name || !Username || !Password || !Url || !Id)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Field Values.',
    });

  try {
    const encryptedUsername = encrypt(`${Username}`);
    const encryptedPassword = encrypt(`${Password}`);

    Database.findOne({ Id }, async (err: any, data: any) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          success: false,
          href: req.originalUrl,
          message: 'Internal Database Error.',
        });
        return 0;
      }
      if (!data) {
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
          Id,
        }).save();

        res.status(200).send({
          success: true,
          href: req.originalUrl,
          message: 'Success! New Favourite Password Saved!',
        });

        return 1;
      } else {
        res.status(409).send({
          success: false,
          href: req.originalUrl,
          message: 'This Password Is Already Saved!',
        });
        return 0;
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      href: req.originalUrl,
      message: 'Internal Database Error.',
    });
    return 0;
  }
};

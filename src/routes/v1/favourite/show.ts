import Database from '../../../schemas/favourites';
import { decrypt } from '../../../utils/controllers/encryption';

module.exports = (req: any, res: any) => {
  try {
    Database.find({})
      .sort({ _id: -1 })
      .limit(0)
      .skip(0)
      .exec()
      .then((data: any) => {
        var decryptedValues: any = [];

        data.map((item: any) => {
          const decryptUsernameObject = {
            iv: item.Username.iv,
            password: item.Username.password,
          };

          const decryptPasswordObject = {
            iv: item.Password.iv,
            password: item.Password.password,
          };

          const decryptedUsername = decrypt(decryptUsernameObject);
          const decryptedPassword = decrypt(decryptPasswordObject);

          const rawData = {
            AppIcon: item.AppIcon,
            Name: item.Name,
            Username: decryptedUsername,
            Password: decryptedPassword,
            Url: item.Url,
            Id: item.Id,
          };

          //advocator orrices seminally arsonist localizability tablecloth mestesos illuminator mandibular bhang demeraras palms

          decryptedValues.push(rawData);

          return 1;
        });
        res.status(200).send({
          success: true,
          href: req.originalUrl,
          message: 'Displaying favourite passwords',
          data: decryptedValues,
        });
      });
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

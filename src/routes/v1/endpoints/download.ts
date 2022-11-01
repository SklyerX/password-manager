import Database from '../../../schemas/passwords';
import { decrypt } from '../../../utils/controllers/encryption';

module.exports = (req: any, res: any) => {
  try {
    Database.find({})
      .limit(0)
      .skip(0)
      .exec()
      .then(async (data: any) => {
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
          };

          decryptedValues.push(rawData);

          return 1;
        });

        const textFileData: any = [];

        decryptedValues.map((item: any) => {
          const stringValue = `{ "AppIcon": "${item.AppIcon}",
"Name": "${item.Name}",
"Username": "${item.Username}",
"Password": "${item.Password}",
"Url": "${item.Url}"
}`;

          textFileData.push(stringValue);
        });

        res.status(200).send({
          success: true,
          href: req.originalUrl,
          message: 'Please write the following data to the users computer!',
          data: textFileData.toString(),
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

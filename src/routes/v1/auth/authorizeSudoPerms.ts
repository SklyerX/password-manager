import Database from '../../../schemas/accounts';
import { decrypt } from '../../../utils/controllers/encryption';

module.exports = (req: any, res: any) => {
  const { Words } = req.body;

  if (!Words)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Field Value Missing.',
    });

  Database.find({})
    .exec()
    .then((data: any) => {
      var allWords: any = [];
      var decryptedWords: any = [];

      data.map((accounts: any) => {
        allWords.push(...accounts.SudoPermArray);
      });

      allWords.map((key: any) => {
        const decryptObject = {
          iv: key.iv,
          password: key.password,
        };
        decryptedWords.push(decrypt(decryptObject));
      });

      if (JSON.stringify(decryptedWords) === JSON.stringify(Words)) {
        res.status(200).send({
          success: true,
          href: req.originalUrl,
          message: 'User Successfully Authorized!',
        });
        return 1;
      } else {
        res.status(409).send({
          success: false,
          href: req.originalUrl,
          message: 'Conflict Met. Invalid Words',
        });
        return 0;
      }
    });
};

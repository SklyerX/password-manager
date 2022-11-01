import Database from '../../../schemas/accounts';
import { encrypt } from '../../../utils/controllers/encryption';
import { generateToken } from '../../../utils/generator/token';
import { generateWords } from '../../../utils/generator/word';

module.exports = async (req: any, res: any) => {
  const { Username, Password, Email } = req.body;

  if (!Username || !Password || !Email)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Missing Field Values.',
    });

  Database.findOne({ Username }, async (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        href: req.originalUrl,
        message: 'Internal Database Error.',
      });
      return 0;
    }
    if (!data) {
      Database.findOne({ Email }, async (error: any, docs: any) => {
        if (error) {
          console.log(err);
          res.status(500).send({
            success: false,
            href: req.originalUrl,
            message: 'Internal Database Error.',
          });
          return 0;
        }
        if (!docs) {
          const arrayOfWords: any = [];
          const nonDecryptedWords: any = [];

          for (let i = 0; i < 12; i++) {
            const generatedWords = generateWords();
            const encrypted = encrypt(generatedWords);

            const encryptObj = {
              iv: encrypted.iv,
              password: encrypted.password,
            };
            arrayOfWords.push(encryptObj);
            nonDecryptedWords.push(generatedWords);
          }

          const Token = `${generateToken(27)}.${generateToken(5)}.${generateToken(27)}`;

          const encryptedToken = encrypt(Token);

          new Database({
            Username,
            Password,
            Email,
            Token: {
              iv: encryptedToken.iv,
              password: encryptedToken.password,
            },
            SudoPermArray: arrayOfWords,
          }).save();

          res.status(200).send({
            success: true,
            href: req.originalUrl,
            message: 'Success! Account created for this user!',
            data: {
              Username,
              Password,
              Email,
              SudoPermArray: nonDecryptedWords,
              Token,
            },
          });

          return 1;
        } else {
          res.status(409).send({
            success: false,
            href: req.originalUrl,
            message: 'Conflict Met. Username Exists',
          });
          return 0;
        }
      });
    } else {
      res.status(409).send({
        success: false,
        href: req.originalUrl,
        message: 'Conflict Met. Username Exists',
      });
      return 0;
    }
  });
};

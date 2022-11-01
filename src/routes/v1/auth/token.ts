import Database from '../../../schemas/accounts';
import { decrypt } from '../../../utils/controllers/encryption';

module.exports = (req: any, res: any) => {
  const { Token } = req.body;

  if (!Token)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Field Values Missing.',
    });

  try {
    Database.find({})
      .skip(0)
      .limit(0)
      .exec()
      .then((data: any) => {
        const AllTokens: any = [];

        data.map((item: any) => {
          const decryptObject = {
            iv: item.Token.iv,
            password: item.Token.password,
          };

          const decryptedToken = decrypt(decryptObject);

          AllTokens.push(decryptedToken);
        });

        if (AllTokens.find((x: string) => x === Token)) {
          res.status(200).send({
            success: true,
            href: req.originalUrl,
            message: 'Success! Account authorized',
          });
          return 1;
        } else {
          res.status(409).send({
            success: false,
            href: req.originalUrl,
            message: 'Conflict Met. No account was found with this credential token.',
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

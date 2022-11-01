import Database from '../../../schemas/passwords';
import { encrypt } from '../../../utils/controllers/encryption';

module.exports = (req: any, res: any) => {
  const { Id, AppIcon, Name, Username, Password, Url } = req.body;

  if (!Id || !AppIcon || !Name || !Username || !Password || !Url)
    return res.status(400).send({
      success: false,
      href: req.originalUrl,
      message: 'Field Values Missing!',
    });

  Database.findOne({ Id }, async (err: any, data: any) => {
    if (err) {
      res.status(500).send({
        success: false,
        href: req.originalUrl,
        message: 'Field Values Missing!',
      });
      return 0;
    }
    if (data) {
      data.AppIcon = AppIcon;
      data.Name = Name;
      data.Username = encrypt(`${Username}`);
      data.Password = encrypt(`${Password}`);
      data.Url = Url;
      data.save();

      res.status(200).send({
        success: true,
        href: req.originalUrl,
        message: 'Success! Values updated for ' + Id,
      });

      return 1;
    } else {
      res.status(409).send({
        success: false,
        href: req.originalUrl,
        message: 'Conflict Met. No Password found for this key!',
      });
      return 0;
    }
  });
};

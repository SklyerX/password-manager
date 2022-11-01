import express from 'express';
import chalk from 'chalk';
import { alert } from '../../utils/loggers';
import Database from '../../schemas/accounts';
import { decrypt } from '../../utils/controllers/encryption';

const router = express.Router();

module.exports = router;

router.use((req, res, next) => {
  alert(
    `${req.originalUrl} ${chalk.yellowBright('-')} ${req.method} ${chalk.yellowBright(
      '-',
    )} ${new Date().toISOString()}`,
    'Request Info',
  );
  next();
});

// middleware
const checkSudoPerm = function (req: any, res: any, next: any) {
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
        next();
      } else {
        res.status(409).send({
          success: false,
          href: req.originalUrl,
          message: 'Conflict Met. Invalid Word(s)',
        });
        return 0;
      }
    });
};

router.get('/health', require('./endpoints/health'));
// AUTHENTICATION
router.post('/auth/register', require('./auth/register'));
router.post('/auth/login', require('./auth/login'));
router.post('/auth/verify', require('./auth/authorizeSudoPerms'));
router.post('/auth/token', require('./auth/token'));
router.delete('/auth/delete', checkSudoPerm, require('./auth/delete'));
// ATTACHMENTS
router.post('/attachments/upload', require('./attachments/upload'));
router.delete('/attachments/delete', checkSudoPerm, require('./attachments/delete'));
router.get('/attachments/show', require('./attachments/show'));
// FAVS
router.post('/favourites/add', require('./favourite/create'));
router.get('/favourites/show', require('./favourite/show'));
router.delete('/favourites/delete', checkSudoPerm, require('./favourite/delete'));
// Passwords
router.post('/passwords/create', require('./passwords/create'));
router.get('/passwords/show', require('./passwords/show'));
router.post('/passwords/upload', require('./passwords/upload'));
router.delete('/passwords/delete', checkSudoPerm, require('./passwords/delete'));
router.patch('/passwords/update', checkSudoPerm, require('./passwords/update'));
// Other
router.get('/length', require('./endpoints/count'));
router.post('/download', checkSudoPerm, require('./endpoints/download'));

// TAGS
// router.post('/tags/create', require('./tags/create'));
// router.get('/tags/show', require('./tags/show'));
// router.delete('/tags/delete', checkSudoPerm, require('./tags/delete'));
// Passwords
// router.post('/passwords/download', checkSudoPerm, require('./passwords/download'));

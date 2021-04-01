import nc from 'next-connect';
import { all } from '@/middlewares/index';
import passport from 'middlewares/passport';
import { extractUser } from '@/lib/api-helpers';

const handler = nc();

handler.use(all);

handler.post(passport.authenticate('local'), (req: any, res: any) => {
  res.json({ user: extractUser(req.user) });
});

handler.delete((req: any, res: any) => {
  req.logOut();
  res.status(204).end();
});

export default handler;

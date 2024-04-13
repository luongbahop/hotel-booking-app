import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const verifyTokenMiddleware = (req, res, next) => {
  const start = new Date().getTime();
  try {
    let accessToken = req.headers?.authorization?.split('Bearer ')[1];

    if (!accessToken) {
      return res.status(403).send({
        error: 'No token provided.',
        success: false,
        exe_time: new Date().getTime() - start,
      });
    }

    jwt.verify(accessToken, process.env.AUTH_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        console.log('Verify access token error', err.message);
        return res.status(401).send({
          error: `Verify access token error: ${err?.message}.`,
          success: false,
          exe_time: new Date().getTime() - start,
        });
      }
      req.userInfo = decoded;
      req.accessToken = accessToken;
      next();
    });
  } catch (error) {
    console.log('internal server error', error.message);
    return res.status(500).send({
      error: error.message,
      success: false,
      exe_time: new Date().getTime() - start,
    });
  }
};

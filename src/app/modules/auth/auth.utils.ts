 

import jwt from 'jsonwebtoken'
import ms from 'ms'

export const createToken = (
    jwtPayload: { email: string; role: string, id:string},
    secret: string,
    expiresIn: string,
  ) => {
    return jwt.sign(jwtPayload, secret,{ expiresIn: Math.floor(ms(expiresIn as ms.StringValue) / 1000)});
  };



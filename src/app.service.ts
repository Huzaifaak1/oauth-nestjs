import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 

  googleAuth(req){
    if(!req.user){
      throw new ForbiddenException("No user from google");
    }
    return {
      message:"User info from google",
      user: req.user 
    }
  }
}

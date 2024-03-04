import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, VerifyCallback} from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(private config : ConfigService){
        super({
            clientID:config.get('OAUTH_CLIENT_ID'),
            clientSecret: config.get('OAUTH_CLIENT_SECRET'),
            callbackURL : 'http://localhost:3000/auth/google/callback',
            scope: ['email','profile']
        });
    }

    async validate(access_token: string, refresh_token : string, profile : any, done: VerifyCallback){
        const {name,email,photos} = profile;
        const user = {
            email : email?.value,
            firstName : name.givenName,
            lastName : name.familyName,
            picture : photos[0]?.value,
            access_token
        }
        done(null,user);
    }
}
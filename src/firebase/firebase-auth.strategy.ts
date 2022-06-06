import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { auth } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { Strategy } from "passport-http-bearer";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, "firebase") {
    private checkRevoked = false;

    constructor(private firebase: FirebaseService) {
        super();
    }

    async validate(jwtToken: string): Promise<auth.UserRecord> {
        const payload = await this.authorize(jwtToken);
        const user = await this.firebase.getAuth().getUser(payload.uid);
        if (user.disabled) {
            throw new ForbiddenException();
        }

        return user;
    }

    private async authorize(jwtToken: string): Promise<DecodedIdToken> {
        try {
            return await this.firebase.getAuth().verifyIdToken(jwtToken, this.checkRevoked);
        } catch (err: unknown) {
            console.error(err)

            throw new UnauthorizedException();
        }
    }
}
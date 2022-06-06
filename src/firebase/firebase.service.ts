import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from "firebase/app";
import * as firebaseAdmin from 'firebase-admin';
import * as firebaseAuth from '@firebase/auth';
import { ServiceAccount } from 'firebase-admin';
import * as serviceAccount from '../config/firebase/firebase-service-account.json';
import { firebaseConfig } from '../config/firebase/firebase-app.js';

@Injectable()
export class FirebaseService {
    private firebaseApp: FirebaseApp;
    private firebaseAdminApp: firebaseAdmin.app.App;

    constructor() {
        this.firebaseApp = initializeApp(firebaseConfig);

        if (firebaseAdmin.apps.length == 0) {
            this.firebaseAdminApp = firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.cert(serviceAccount as ServiceAccount),
            });
        } else {
            this.firebaseAdminApp = firebaseAdmin.apps[0];
        }
    }

    getAuth = (): firebaseAdmin.auth.Auth => {
        return this.firebaseAdminApp.auth();
    }

    getAuthClient = () => firebaseAuth;
}

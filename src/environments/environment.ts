// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironementModel } from './environment.model';

export const environment = {
    production: false,
};

const local = 'http://localhost:8090/';
// const local = 'http://192.168.43.172:8090/';

export const config: EnvironementModel = {
    projectName: 'Hapkido Brisbane Students',
    environmentName: 'Local Environment',
    ionicEnvName: 'local',
    APIEndpoint: local,
    classAPIEndpoint: local + 'class/',
    studentAPIEndpoint: local + 'student/',
    familyAPIEndpoint: local + 'family/',
    techniqueAPIEndpoint: local + 'technique/',
    tagAPIEndpoint: local + 'tag/',
    getClassTime: 15000,
    aws_cognito_region: 'ap-southeast-2',
    aws_user_pools_id: 'ap-southeast-2_xwJzu6o5o',
    aws_user_pools_web_client_id: '1kjv0a3rm18od63enl28q9smj2',
    feature_toggle: {
        cognito_login: true,
    },
    static_image_location:
        'https://hapkido-convert-videos.s3-ap-southeast-2.amazonaws.com/static_images/',
    default_logo: 'hapkido_brisbane_logo.png',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

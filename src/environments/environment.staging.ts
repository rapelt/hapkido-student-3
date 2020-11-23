import { EnvironementModel } from './environment.model';

export const environment = {
    production: false,
};

export const config: EnvironementModel = {
    environmentName: 'Staging Environment',
    ionicEnvName: 'staging',
    APIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/',
    classAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/class/',
    studentAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/student/',
    familyAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/family/',
    techniqueAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/technique/',
    tagAPIEndpoint:
        'https://bgrgxylj3c.execute-api.ap-southeast-2.amazonaws.com/staging/tag/',
    getClassTime: 15000,
    aws_cognito_region: 'ap-southeast-2',
    aws_user_pools_id: 'ap-southeast-2_iSE7Uw8vG',
    aws_user_pools_web_client_id: '6cmv8equdgsmvrhrphbggmd2at',
    feature_toggle: {
        cognito_login: true,
    },
    static_image_location:
        'https://hapkido-convert-videos.s3-ap-southeast-2.amazonaws.com/static_images/',
    default_logo: 'hapkido_brisbane_logo.png',
};

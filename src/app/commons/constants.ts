import {UrlConfigService} from './url-config.service';

export const Constants = {

  TOKEN_KEY: 'altimetrik_token',
  USER_KEY: 'altimetrik_user',
  ALLOWED_URL: [UrlConfigService._ADD_USER, UrlConfigService._LOGIN, UrlConfigService._VALIDATE_SESSION]
};


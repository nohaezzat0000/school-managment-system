/*import { environment } from 'src/environments/environment';
const BASE_URL = environment.apiBaseUrl;*/

const BASE_URL = 'http://localhost:8080';

export const ApiUrls = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
}

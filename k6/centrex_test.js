import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1, // 동시 사용자 수
  iterations: 200, // 10번 요청 (계정 10개 등록)
};

const BASE_URL = 'https://api.staging.unocare.co.kr/admin/centrex'; // API 엔드포인트
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODMzNjY4MiwianRpIjoiZjBjY2Y1YzEtNjE0MC00Mzg1LWExNDEtNGI0NzczOWNmODZjIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5Ijp7ImlkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ0eXBlIjoiYWRtaW4ifSwibmJmIjoxNzQ4MzM2NjgyLCJleHAiOjE3NDgzNDc0ODJ9.iYKTtaHwlTNx8hDl3oKPyYF8PFJuxGm1fSCHhZss1EI'; // JWT 토큰 입력

export default function () {
  const iter = __ITER; // 현재 반복 횟수

  const payload = JSON.stringify({
    accountId: `${iter + 1}`, // 예: 1, 2, 3, ...
    accountPassword: `${iter + 1}`,
    carrier: 'SK',
    clinicId: 1,
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: TOKEN,
  };

  const res = http.post(BASE_URL, payload, { headers });

  const success = check(res, {
    '✅ 상태코드 200 or 201': (r) => r.status === 200 || r.status === 201,
  });

  if (!success) {
    console.error(`❌ error! response: ${res.status} - ${res.body}`);
  }

  console.log(`📨 계정 등록 완료: accountId ${iter + 1}`);

  // sleep(1); // 요청 사이 간격
}
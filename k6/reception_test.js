import http from "k6/http";
import { check, sleep } from "k6";
// import { format } from "path";
// import { start } from "repl";

export const options = {
  vus: 10, // 동시 사용자 수
  //   duration: '30s', // 테스트 시간
  iterations: 120, // 1000번 요청 하는거
};

const BASE_URL = "https://api.test.unocare.co.kr/registrations"; // 접수
// const BASE_URL = "https://api.dev.unocare.co.kr/consultings"; // 상담
// const BASE_URL = "https://api.dev.unocare.co.kr/treatments"; // 진료

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NzcwMzIxMywianRpIjoiNWRlMGEyNDAtMTg5Yi00NzJhLWJiYzUtMGU4NTcyNWE4ZTdkIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5Ijp7ImlkIjoxLCJlbWFpbCI6ImRldkB0ZXN0LmNvbSIsInR5cGUiOiJ1c2VyIn0sIm5iZiI6MTc0NzcwMzIxMywiZXhwIjoxNzQ3NzYwODEzfQ.AYL8bCB7QsZRCYrYhIx1zvhfppFbyJ551Knbzkv1fOk"; // 필요 시 토큰 추가

export default function () {

  const baseHour = 9; // 시작 시간
  const intervalMin = 30; // 30분 간격으로
  const iter = __ITER; // 현재 반복 횟수 (0부터 시작함 ㅇㅇ)


  const totalMinutes = iter * intervalMin;
  const startHour = baseHour + Math.floor(totalMinutes / 60);
  const startMinute = totalMinutes % 60;

  const endHour = baseHour + Math.floor((totalMinutes + 30) / 60);
  const endMinute = (totalMinutes + 30) % 60;

  const formatTime = (h, m) => `2025-05-23 ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

  const startAt = formatTime(startHour, startMinute);
  const endAt = formatTime(endHour, endMinute); // 30분 후로 설정

  const payload = JSON.stringify({
    acquisitionChannelId: null,
    assistId: null,
    category: "CONSULTING",
    counselorId: 1,
    createdBy: 1,
    customerId: 602906, // 고정 고객 ID ㅇㅇ
    date: "2025-05-23",
    // departmentId: 69, // 상담5
    departmentId: 1909, // 상담2
    doctorId: null,
    endAt: endAt,
    estimatedServiceMinutes: 30,
    isNewCustomer: false,
    memo: `<p>접수 부하 테스트 ${iter + 1}</p>`,
    startAt: startAt,
    treatmentItemIds: [],
  });

//   const payload = JSON.stringify({
//     counselorId: 1,
//     customerId: 837173,
//     date: '2025-05-19',
//     memo: `<p>상담 부하 테스트 시도 ${iter + 1}</p>`,
//     registrationId: 9317671,
//     resultId: null,
//     treatmentItemIds: [],
//   });

//   const payload = JSON.stringify({
//     customerId: 837173,
//     date: '2025-05-19',
//     doctorId: 1,
//     memo: '<p>진료 부하 테스트</p>',
//     registrationId: 9317671,
//     treatmentItemIds: [],
//   });

  const headers = {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  };

  const res = http.post(`${BASE_URL}`, payload, { headers });

  const success = check(res, {
    "✅ status is 200 or 201": (r) => r.status === 200 || r.status === 201,
  });
  
  if (!success) {
    console.error(`❌ error! response: ${res.status} - ${res.body}`);
  }

  console.log(`접수 ${iter + 1}: ${startAt} ~ ${endAt}`);
//   console.log(`상담 차트 등록 ${iter + 1} 완료`);

}




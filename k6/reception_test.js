import http from "k6/http";
import { check, sleep } from "k6";
// import { format } from "path";
// import { start } from "repl";

export const options = {
  vus: 1, // 동시 사용자 수
  //   duration: '30s', // 테스트 시간
  iterations: 20, // 1000번 요청 하는거
};

const BASE_URL = "https://api.staging.unocare.co.kr/appointments"; // 접수 test

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NDI5OTg0MCwianRpIjoiZWI2ZTczMmItNTA5ZC00OWZlLWJjNGEtNzRhY2JmN2FkNDM1IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5Ijp7ImlkIjoxLCJlbWFpbCI6ImRldkB0ZXN0LmNvbSIsInR5cGUiOiJ1c2VyIn0sIm5iZiI6MTc1NDI5OTg0MCwiZXhwIjoxNzU0MzU3NDQwfQ.pxQQ7T4sgEhVQECtkhvEp1FYYEPFrTfJ48As9RkSpFA"; // 필요 시 토큰 추가

export default function () {

  const baseHour = 10; // 시작 시간
  const intervalMin = 30; // 30분 간격으로
  const iter = __ITER; // 현재 반복 횟수 (0부터 시작함 ㅇㅇ)

  const totalMinutes = iter * intervalMin;
  const startHour = baseHour + Math.floor(totalMinutes / 60);
  const startMinute = totalMinutes % 60;

  const endHour = baseHour + Math.floor((totalMinutes + 30) / 60);
  const endMinute = (totalMinutes + 30) % 60;

  const formatTime = (h, m) => `2025-06-04 ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

  const startAt = formatTime(startHour, startMinute);
  const endAt = formatTime(endHour, endMinute); // 30분 후로 설정

  // customerid 증가 ㅇㅇ
  const baseCustomerId = 870257;
  const customerId = baseCustomerId + iter;

  // 예약 시
  // const payload = JSON.stringify({
  //   acquisitionChannelId: null,
  //   assistId: null,

  //   category: "CONSULTING",
  //   counselorId: null,

  //   createdBy: 1,
  //   customerId: customerId, 

  //   date: "2025-08-06",
  //   departmentId: 15874,

  //   doctorId: null,

  //   endAt: endAt,
  //   sendSms: [],
  //   // 3651, 3635, 3636
  //   estimatedServiceMinutes: 30,
  //   isNewCustomer: false,
  //   memo: `<p>자동전송용 예약 테스트 ${iter + 1}</p>`,
  //   startAt: startAt,
  //   treatmentItemIds: [],
  // });

  // 바로 예약 시
  const payload = JSON.stringify({
    acquisitionChannelId: null,

    category: "CONSULTING",

    createdBy: 1,
    customerId: customerId, 

    departmentId: 15874,

    endAt: "2025-08-10 21:30",
    // endAt,
    sendSms: [3651],
    // 3635, 3636
    startAt: "2025-08-10 21:00",
  });

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
  } else {
    // 일반 예약 시
    // console.log(`✅ 접수 ${iter + 1}: ${startAt} ~ ${endAt} (고객ID: ${customerId})`); 

    // 바로 예약 시
    console.log(`✅ 예약 ${iter + 1}: 고객ID: ${customerId}`);
  }

  sleep(0.2); // 딜레이 추가 약간씩

}
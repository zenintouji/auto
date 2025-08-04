import http from "k6/http";
import { check, sleep } from "k6";
// import { format } from "path";
// import { start } from "repl";

export const options = {
  vus: 1, // 동시 사용자 수
  //   duration: '30s', // 테스트 시간
  iterations: 100, // 1000번 요청 하는거
};

const BASE_URL = "https://api.staging.unocare.co.kr/appointments"; // 접수 test

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1NDI4ODAxNiwianRpIjoiZTcwOTY3ODAtNmQ3Ny00ZTRiLWJiYzItMGNjYWM5OWQxNDI3IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5Ijp7ImlkIjoxLCJlbWFpbCI6ImRldkB0ZXN0LmNvbSIsInR5cGUiOiJ1c2VyIn0sIm5iZiI6MTc1NDI4ODAxNiwiZXhwIjoxNzU0MzQ1NjE2fQ.rm1t54vu6b7TVYp9fEH2FsdImmkBfHauT9v1JDaQul8"; // 필요 시 토큰 추가

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

  const payload = JSON.stringify({
    acquisitionChannelId: null,
    // assistId: null,

    category: "CONSULTING",
    // counselorId: null,

    createdBy: 1,
    customerId: customerId, 

    // date: "2025-08-06",
    departmentId: 15866,

    // doctorId: null,
    // sendSMS: 

    endAt: "2025-08-06 21:30",
    // endAt,
    sendSms: [3635, 3636],
    // estimatedServiceMinutes: 30,
    // isNewCustomer: false,
    // memo: `<p>자동전송용 예약 테스트 ${iter + 1}</p>`,
    startAt: "2025-08-06 21:00",
    // startAt,
    // treatmentItemIds: [],
  });


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
  } else {
    // console.log(`✅ 접수 ${iter + 1}: ${startAt} ~ ${endAt} (고객ID: ${customerId})`);
    console.log(`✅ 예약 ${iter + 1}: 고객ID: ${customerId}`);
  }

  sleep(0.2); // 딜레이 추가 약간씩

}
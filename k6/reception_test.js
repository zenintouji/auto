import http from "k6/http";
import { check, sleep } from "k6";
// import { format } from "path";
// import { start } from "repl";

export const options = {
  vus: 1, // 동시 사용자 수
  //   duration: '30s', // 테스트 시간
  iterations: 2, // 1000번 요청 하는거
};

// const BASE_URL = "https://api.dev.unocare.co.kr/registrations"; // 접수 dev
const BASE_URL = "https://api.test.unocare.co.kr/registrations"; // 접수 test

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0OTAwMzQxNiwianRpIjoiZjMwNmI1ZmEtOThkMC00OTIwLTllNTctYjg3ODRiMjgwYmQ0IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5Ijp7ImlkIjoxLCJlbWFpbCI6ImRldkB0ZXN0LmNvbSIsInR5cGUiOiJ1c2VyIn0sIm5iZiI6MTc0OTAwMzQxNiwiZXhwIjoxNzQ5MDYxMDE2fQ.oGdpcgXx6XoTHsW0gLNFf-BlDcrdvplXdpbV1kaunoE"; // 필요 시 토큰 추가

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

  const payload = JSON.stringify({
    acquisitionChannelId: null,
    assistId: 3906,
    // 3906, 3905, 3885, 3884, 3883, 3882, => test

    category: "CONSULTING",
    counselorId: 3884,
    // 3890, 3887, 3886, 3885, 3884, 3883, => test

    createdBy: 1,
    customerId: 602895, 
    // 602906, 602903, 602766, 521815, 602740, 602895, => test

    date: "2025-06-04",
    departmentId: 1782,
    // 1913, 1914, 1915, 1916, 1924, 1925, 1926, 1781, 1782, => test

    doctorId: 3886,
    // 3889, 3888, 3886, 3885, 3884, 3883, => test

    endAt: endAt,
    estimatedServiceMinutes: 30,
    isNewCustomer: false,
    memo: `<p>접수 부하 테스트 ${iter + 1}</p>`,
    startAt: startAt,
    treatmentItemIds: [],
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
  }

  console.log(`접수 ${iter + 1}: ${startAt} ~ ${endAt}`);
//   console.log(`상담 차트 등록 ${iter + 1} 완료`);

}




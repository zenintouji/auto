import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
    // vus: 3000,            // 동시 접속자 수 ㅇㅇ
    // duration: '1m'     // 테스트 시간 지정 ㅇㅇ
    stages: [
        { duration: '1m', target: 500},
        { duration: '1m', target: 1000},
        { duration: '1m', target: 2000},
        { duration: '2m', target: 3000},
        { duration: '2m', target: 0},
    ],
    gracefulRampDown: '30',
}

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NTI0ODEyMywianRpIjoiYjk2ZjRkNzEtYzk1NC00OGFkLWI4MjUtMjk2M2I2MzY3NjhlIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5Ijp7ImlkIjo0LCJlbWFpbCI6Imp3cGFya0B2MnRlc3QuY29tIiwidHlwZSI6InVzZXIifSwibmJmIjoxNzQ1MjQ4MTIzLCJleHAiOjE3NDUzMDU3MjN9.fovkscjxDqBuW1vZABbl2BeFcfSl-QsyAZmeOIfn5Og'; // 토큰 ㄱㄱㄱ
const WS_URL = 'wss://ws.unocare.co.kr/ws/clinics/1';    // websocket 주소

export default function() {
    const res = ws.connect(WS_URL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    }, function (socket) {
        socket.on('open', function () {
            console.log('connect success');

            const authMessage = JSON.stringify({
                type: 'AUTH',
                payload: TOKEN,
            });

            socket.send(authMessage);
            console.log('Auth message sended');

            socket.on('message', function (msg) {
                console.log('Received: ', msg);
                if (msg.includes('PONG')) {
                    console.log('PONG checked');
                }
            });
            socket.setTimeout(() => {
                console.log('request connection off');
                socket.close();
            }, 5000); // 5초 후에 종료시킴~
        });

        socket.on('error', (e) => {
            console.log('error: ', e.error());
        });

        socket.on('close', () => {
            console.log('connection terminated');
        });
    });

    check(res, {
        'connect on socket succeed': (r) => r && r.status == 101,}) || console.error('connect failed');
}
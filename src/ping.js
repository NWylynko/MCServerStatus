import TcpSocket from 'react-native-tcp-socket';

export default function Ping(host = 'localhost', port = 25565, timeout = 5) {
  return new Promise((resolve, reject) => {
    var start_time = new Date();

    const client = TcpSocket.createConnection({host, port}, handShake);

    function handShake() {
      client.write(Buffer.from([0xfe, 0x01]));
    }

    client.on('data', data => {
      if (data != null && data !== '') {
        var server_info = data.toString().split('\x00\x00\x00');

        if (server_info != null && server_info.length >= 6) {
          resolve({
            online: true,
            version: server_info[2].replace(/\u0000/g, ''),
            motd: server_info[3].replace(/\u0000/g, ''),
            current_players: server_info[4].replace(/\u0000/g, ''),
            max_players: server_info[5].replace(/\u0000/g, ''),
            ping: Math.round(new Date() - start_time),
          });
        } else {
          reject({
            online: false,
          });
        }
      }
      client.destroy();
    });

    client.on('error', error => {
      client.destroy();
      reject({
        online: false,
      });
    });

    client.on('close', error => {
      reject({
        online: false,
      });
    });
  });
}

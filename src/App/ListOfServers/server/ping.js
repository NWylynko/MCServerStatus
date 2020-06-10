/* eslint-disable no-undef */

// stolen from https://github.com/Cryptkeeper/mc-ping-updated/blob/master/lib/ping.js

import TcpSocket from 'react-native-tcp-socket';

import mcpc_buffer from './ping/mcpc_buffer';

export default function Ping(host = 'localhost', port = 25565, timeout = 5) {
  return new Promise((resolve, reject) => {
    let start_time = new Date();

    const client = TcpSocket.createConnection({host, port}, handShake);

    function handShake() {
      var handshakeBuffer = new mcpc_buffer();

      handshakeBuffer.writeVarInt(0);
      handshakeBuffer.writeVarInt(47);
      handshakeBuffer.writeString(host);
      handshakeBuffer.writeUShort(port);
      handshakeBuffer.writeVarInt(1);

      writePCBuffer(handshakeBuffer);

      var setModeBuffer = new mcpc_buffer();
      setModeBuffer.writeVarInt(0);
      writePCBuffer(setModeBuffer);
    }

    function writePCBuffer(buffer) {
      var length = new mcpc_buffer();

      length.writeVarInt(buffer.getBuffer().length);

      client.write(Buffer.concat([length.getBuffer(), buffer.getBuffer()]));
    }

    var readingBuffer = new Buffer(0);

    client.on('data', function(data) {
      readingBuffer = Buffer.concat([readingBuffer, data]);

      var buffer = new mcpc_buffer(readingBuffer);
      var length;

      try {
        length = buffer.readVarInt();
      } catch (err) {
        // The buffer isn't long enough yet, wait for more data!
        return;
      }

      // Make sure we have the data we need!
      if (readingBuffer.length < length - buffer.getOffset()) {
        return;
      }

      // Read the packet ID, throw it away.
      buffer.readVarInt();

      try {
        let json = JSON.parse(buffer.readString());

        resolve({
          online: true,
          version: json.version.name,
          motd:
            json.description.text ||
            json.description.extra.map(({text}) => text).join(''),
          current_players: json.players.online,
          max_players: json.players.max,
          ping: Math.round(new Date() - start_time),
          icon: json.favicon,
          players: json.players.sample,
        });
      } catch (err) {
        // Our data is corrupt? Fail hard.
        reject({online: false});

        return;
      }

      // We're done here.
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

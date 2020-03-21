/* eslint-disable no-bitwise */
/* eslint-disable no-undef */

// stolen from https://github.com/Cryptkeeper/mc-ping-updated/blob/master/lib/mcpc_buffer.js

export default class MinecraftServerBuffer {
  constructor(existingBuffer) {
    this.buffer = existingBuffer || new Buffer(48);
    this.offset = 0;
  }

  writeVarInt(val) {
    while (true) {
      if ((val & 0xffffff80) === 0) {
        this.writeUByte(val);

        return;
      }

      this.writeUByte((val & 0x7f) | 0x80);

      val = val >>> 7;
    }
  }

  writeString(string) {
    this.writeVarInt(string.length);

    if (this.offset + string.length >= this.buffer.length) {
      Buffer.concat([this.buffer, new Buffer(string.length)]);
    }

    this.buffer.write(string, this.offset, string.length, 'UTF-8');

    this.offset += string.length;
  }

  writeUShort(val) {
    this.writeUByte(val >> 8);
    this.writeUByte(val & 0xff);
  }

  writeUByte(val) {
    if (this.offset + 1 >= this.buffer.length) {
      Buffer.concat([this.buffer, new Buffer(50)]);
    }

    this.buffer.writeUInt8(val, this.offset++);
  }

  readVarInt() {
    var val = 0;
    var count = 0;

    while (true) {
      var i = this.buffer.readUInt8(this.offset++);

      val |= (i & 0x7f) << (count++ * 7);

      if ((i & 0x80) !== 128) {
        break;
      }
    }

    return val;
  }

  readString() {
    var length = this.readVarInt();
    var str = this.buffer.toString('UTF-8', this.offset, this.offset + length);

    this.offset += length;

    return str;
  }

  getBuffer() {
    return this.buffer.slice(0, this.offset);
  }

  getOffset() {
    return this.offset;
  }
}

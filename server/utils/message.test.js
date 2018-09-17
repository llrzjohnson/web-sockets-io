const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");

const { app } = require("./../server");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    let from = "Donna";
    let text = "Some random message";
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should return correct location object", () => {
    let from = "Deb";
    let latitude = 43.77;
    let longitude = -79.29;
    let url = "https://www.google.com/maps?q=43.77,-79.29";
    let message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, url });
  });
});

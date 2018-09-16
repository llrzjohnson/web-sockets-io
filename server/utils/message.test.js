const expect = require("expect");

const { generateMessage } = require("./message");

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

import mockAxios from "axios";
import AuthService from "./auth.js";

jest.mock("axios");

describe("AuthService", () => {
  it("should return a token when user login", async () => {
    const token = "123.123.123";
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } });
    });

    const response = await AuthService(mockAxios).login({
      email: "teste@test.com",
      password: "123456",
    });
    expect(response.data).toHaveProperty("token");
    expect(response).toMatchSnapshot()
  });
});

import React from "react";
import { render, RenderResult, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import login from "../utils/login";
import Login from "../components/Login";
import { LoginType } from "../types/Login";

jest.mock("../utils/login");
const loginMock = login as jest.Mock;

const mockNavigate = jest.fn();
jest.mock("@reach/router", () => ({
  useNavigate: () => mockNavigate,
}));

const status500 = {
  status: 500,
  statusText: "Server error. Try again later",
};

const status422 = {
  status: 422,
  statusText: "Invalid credentials",
};

const status400 = {
  status: 400,
  statusText: "An error occurred",
};

const status200 = {
  data: { role: "user" },
  status: 200,
  statusText: "",
};

const userData: LoginType = {
  username: "JohnLukeThe3rd",
  password: "Password123",
};

describe("<Login />", () => {
  let screen: RenderResult;
  let loginButton: HTMLElement;
  let submitHandler: jest.Mock;
  let form: HTMLElement;

  beforeEach(() => {
    screen = render(<Login />);
    loginButton = screen.getByRole("button", { name: /login/i });
    submitHandler = jest.fn((e) => e.preventDefault());
    form = screen.getByRole("form", { name: /login/i });
    form.onsubmit = submitHandler;
  });

  describe("typing user info", () => {
    it("shows username and password", async () => {
      expect(screen.queryByDisplayValue("JohnLukeThe3rd")).toBeNull();
      await userEvent.type(screen.getByLabelText(/Username/), "JohnLukeThe3rd");
      await userEvent.type(screen.getByLabelText(/Password/), "Password123");
      expect(screen.queryByDisplayValue("JohnLukeThe3rd")).toBeInTheDocument();
      expect(screen.queryByDisplayValue("Password123")).toBeInTheDocument();
    });
  });

  describe("username field", () => {
    it("gets focused on component mount", () => {
      expect(screen.getByLabelText(/Username/)).toEqual(document.activeElement);
    });
  });

  describe("submit handler", () => {
    it("executes if fields non-empty", async () => {
      expect(submitHandler).not.toHaveBeenCalled();
      await userEvent.type(
        screen.getByLabelText(/Username/),
        userData.username
      );
      await userEvent.type(
        screen.getByLabelText(/Password/),
        userData.password
      );
      await act(async () => userEvent.click(loginButton));
      expect(submitHandler).toHaveBeenCalledTimes(1);
      expect(submitHandler).toHaveReturnedWith(undefined);
    });
  });

  describe("login error label", () => {
    beforeEach(async () => {
      await userEvent.type(
        screen.getByLabelText(/username/i),
        userData.username
      );
      await userEvent.type(
        screen.getByLabelText(/password/i),
        userData.password
      );
    });

    it('should show "An error occurred" if api call returns 400', async () => {
      loginMock.mockRejectedValueOnce({ response: status400 });
      expect(screen.queryByText(status400.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(loginButton));
      expect(screen.getByText(status400.statusText)).toBeInTheDocument();
    });

    it('should show "Invalid credentials" if api call returns 422', async () => {
      loginMock.mockRejectedValueOnce({ response: status422 });
      expect(screen.queryByText(status422.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(loginButton));
      expect(screen.getByText(status422.statusText)).toBeInTheDocument();
    });

    it('should show "Server error. Try again later" if api call returns 500', async () => {
      loginMock.mockRejectedValueOnce({ response: status500 });
      expect(screen.queryByText(status500.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(loginButton));
      expect(screen.getByText(status500.statusText)).toBeInTheDocument();
    });

    it('should show "Network error" if api call returns undefined', async () => {
      loginMock.mockRejectedValueOnce({ response: undefined });
      expect(screen.queryByText("Network error")).not.toBeInTheDocument();
      await act(async () => userEvent.click(loginButton));
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });

    it('should show "Server error. Try again later" if api response does not include username', async () => {
      loginMock.mockResolvedValueOnce(status200);
      expect(screen.queryByText(status500.statusText)).not.toBeInTheDocument();
      await act(async () => userEvent.click(loginButton));
      expect(screen.getByText(status500.statusText)).toBeInTheDocument();
    });

    it("should redirect on successful login", async () => {
      const correctResponse = {
        ...status200,
        data: { username: userData.username, role: "user" },
      };
      loginMock.mockResolvedValueOnce(correctResponse);
      await act(async () => userEvent.click(loginButton));
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(
        `/${correctResponse.data.username}`
      );
    });
  });
});

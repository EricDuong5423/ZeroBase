import { WelcomeScreen } from "@/components/auth";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

const mockOnPress = jest.fn();
jest.mock("../components/Reuse", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    __esModule: true,
    MenuIcon: () => <View testID="menu-icon" />,
    AppButton: ({ text }) => (
      <Text testID={`app-button-${text}`} onPress={mockOnPress}>
        {text}
      </Text>
    ),

    AppLogo: () => <View testID="app-logo" />,
    SocialButtons: () => <View testID="social-buttons" />,
  };
});

describe("WelcomeScreen", () => {
  it("matches snapshot", () => {
    const { toJSON } = render(<WelcomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it("renders welcome message", () => {
    const { getByText } = render(<WelcomeScreen />);
    const text = `Know your limit for 
a better end of month`;

    expect(getByText(text)).toBeTruthy();
  });
  it("calls onPress when sign in button is pressed", () => {
    const { getByTestId } = render(<WelcomeScreen />);
    const button = getByTestId("app-button-Sign in");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });
  it("calls onPress when sign up button is pressed", () => {
    const { getByTestId } = render(<WelcomeScreen />);
    const button = getByTestId("app-button-Sign up");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });
});

import { View, ScrollView, Dimensions } from "react-native";
import { OnboardingScreen } from "@/components/auth";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

const mockOnComplete = jest.fn();
jest.mock("../components/Reuse", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    __esModule: true,
    MenuIcon: () => <View testID="menu-icon" />,
    AppButton: ({ text, onPress }: any) => (
      <Text testID={`app-button-${text}`} onPress={onPress}>
        {text}
      </Text>
    ),
  };
});

describe("OnboardingScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    const { toJSON } = render(<OnboardingScreen onComplete={jest.fn()} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("render slide đầu tiên đúng title", () => {
    const { getByText } = render(
      <OnboardingScreen onComplete={mockOnComplete} />
    );

    expect(getByText("Manage your money")).toBeTruthy();
  });

  it("bấm Next khi chưa ở slide cuối thì không gọi onComplete", () => {
    const { getAllByText } = render(
      <OnboardingScreen onComplete={mockOnComplete} />
    );
    const nextButtons = getAllByText("Next");
    fireEvent.press(nextButtons[0]);

    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  it("bấm Login Now ở slide cuối sẽ gọi onComplete", () => {
    const { getByText, UNSAFE_getByType } = render(
      <OnboardingScreen onComplete={mockOnComplete} />
    );

    const width = Dimensions.get("window").width;

    const scrollView = UNSAFE_getByType(ScrollView);

    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: { x: width * 2, y: 0 },
      },
    });

    const loginNowButton = getByText("Login Now");
    fireEvent.press(loginNowButton);

    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });
  it("gọi onLayout để cập nhật pageWidth", () => {
    const { UNSAFE_getAllByType } = render(
      <OnboardingScreen onComplete={mockOnComplete} />
    );
    const views = UNSAFE_getAllByType(View);
    const contentAreaView = views.find(
      (v) => typeof v.props.onLayout === "function"
    );
    fireEvent(contentAreaView!, "layout", {
      nativeEvent: {
        layout: {
          width: 400,
          height: 800,
        },
      },
    });
  });
});

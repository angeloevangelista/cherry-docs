import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isDarkTheme: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 100%;

  ${({ isDarkTheme }) => css`
    color: ${isDarkTheme ? '#909090' : '#000'};
    background-color: ${isDarkTheme ? '#1e1e1e' : '#fff'};
  `};
`;

export const Header = styled.View`
  padding: 8px 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderActions = styled.View`
  flex: 1;
  margin-left: 16px;

  flex-direction: row;
  justify-content: flex-end;
`;

export const HeaderActionButton = styled(RectButton)`
  padding: 6px;
  margin: 4px;

  align-items: center;
  justify-content: center;

  border-radius: 4px;
`;

interface TextAreaProps {
  useEncoded: boolean;
  isDarkTheme: boolean;
}

export const TextArea = styled.TextInput.attrs<TextAreaProps>(
  ({ isDarkTheme }) => ({
    placeholderTextColor: isDarkTheme ? '#555555' : '#b6b6b6',
    textAlignVertical: 'top',
  }),
)<TextAreaProps>`
  width: 100%;
  height: 100%;

  padding: 16px;

  ${({ isDarkTheme, useEncoded }) => css`
    color: ${isDarkTheme ? '#909090' : '#000'};
    background-color: ${isDarkTheme ? '#000' : '#fff'};

    font-size: ${useEncoded ? '24px' : '16px'};
    font-family: ${useEncoded ? 'Cherry Code' : 'sans-serif'};
  `}
`;

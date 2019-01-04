import styled from 'styled-components';
import ConsoleColor from './ConsoleColor';

const defaultFont = 'Raleway, sans-serif';
const titleFont = 'Raleway, Helvetica, Arial';

const getTextColor = (key = 'textHeading') => {
    return ConsoleColor.TEXT_COLORS[key];
};

export const Heading1 = styled.h1`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 48px;
`;

export const Heading2 = styled.h2`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Heading3 = styled.h3`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Heading4 = styled.h4`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Heading5 = styled.h5`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
`;

export const Heading6 = styled.h6`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
`;

export const Text = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
`;

export const ErrorText = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
`;

export const HighlightTextHeading1 = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

export const HighlightText = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${titleFont};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;

export const BoldText = styled.span`
  color: ${props => getTextColor(props.color)};
  font-family: ${defaultFont};
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px;
`;
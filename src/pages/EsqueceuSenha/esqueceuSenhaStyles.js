import styled from "styled-components";
import Button from "@mui/material/Button";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  min-height: 100vh;
  background: #ffffffff;
`;

export const ContainerLeft = styled.div`
  background: rgb(242 248 252);
  margin: 25px;
  border-radius: 20px;
  min-height: 80vh;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 80px;
  
  h1 {
    font-size: 32px;
    font-weight: 600;
    color: #333;
    margin: 0 0 10px 0;
  }

  @media (max-width: 768px) {
    padding-right: 20px;
    padding-left: 20px;
    
    h1 {
      font-size: 24px;
    }
  }
`;

export const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin: 0 0 30px 0;
  text-align: left;
  line-height: 1.5;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

export const StyledButton = styled(Button)`
  && {
    background-color: rgb(0 110 196);
    color: white;
    padding: 12px 24px;
    text-transform: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    width: 100%;
    margin-top: 10px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    
    &:hover {
      background-color: rgb(63 147 211);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    }
    
    &:disabled {
      background-color: #cccccc;
      color: #666666;
      box-shadow: none;
    }
  }
`;

export const LinkComponent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-top: 20px;
  color: #667eea;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #5568d3;
    text-decoration: underline;
  }
`;

export const InfoText = styled.p`
  font-size: 13px;
  color: #666;
  margin: 15px 0 0 0;
  text-align: center;
  line-height: 1.5;
`;
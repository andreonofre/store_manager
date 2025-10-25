import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  min-height: 100vh;
  background: #ffffffff;
`

export const ContainerLeft = styled.div`
  background: rgb(242 248 252);
  margin: 25px;
  border-radius: 20px;
  min-height: 80vh;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

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
`

export const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin: 0 0 30px 0;
  text-align: left;
  line-height: 1.5;
`

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`


export const StyledTextField = styled(TextField)`
    && {
        .MuiOutlinedInput-root {
            border-radius: 12px; /* Ajuste o valor conforme desejado */
            
            fieldset {
                border-radius: 12px; /* Mesmo valor */
            }
            
            &:hover fieldset {
                border-color: #006EC4;
            }
            
            &.Mui-focused fieldset {
                border-color: #006EC4;
            }
        }
    }
`


export const StyledButton = styled(Button)`
    width: 75%;
    && {
        background-color: #006EC4;
        text-transform: none;
        border-radius: 10px;
        align-self: center;
        &:hover {
            background-color: #006fc4c0;
        }
    }
`

export const LinkComponent = styled.div`
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    margin-bottom: -1.5rem;
    color: #4794ceff;
    font-weight: 200;
    align-self: center;
    text-align: center;
    cursor: pointer;
    &&:hover {
        font-weight: 400;
        color: #4982fdbe;
    }
`

export const InfoText = styled.p`
  font-size: 13px;
  color: #666;
  margin: 15px 0 0 0;
  text-align: center;
  line-height: 1.5;
`
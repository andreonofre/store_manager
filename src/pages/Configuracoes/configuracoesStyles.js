import styled from "styled-components";
import Button from "@mui/material/Button";
import { styled as muiStyled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  min-height: 100vh;
  background: transparent; /* Removido o background daqui */

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const ProfileSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

export const AdicionarFoto = styled(Button)`
  && {
    background-color: #217ddaff;
    color: white;
    padding: 10px 24px;
    text-transform: none;
    font-size: 14px;
    border-radius: 50px;

    &:hover {
      background-color: #2a69b1ff;
    }
  }
`;

export const FormSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SaveButton = styled(Button)`
  && {
    background-color: #4caf50;
    color: white;
    padding: 12px 24px;
    margin-top: 20px;
    text-transform: none;
    font-size: 16px;
    font-weight: 500;
    border-radius: 50px;
    width: 300px;
    align-self: center;

    &:hover {
      background-color: #45a049;
    }
  }
`;

export const InfoText = styled.p`
  font-size: 13px;
  color: #666;
  margin: 10px 0 0 0;
  text-align: center;
`;

export const NotificationGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  color: #1976d2;

  svg {
    font-size: 24px;
  }
`;

export const NotificationTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NotificationLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const NotificationDescription = styled.span`
  font-size: 13px;
  color: #666;
`;

export const StyledSwitch = muiStyled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(28px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#65C466',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 30,
    height: 30,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 34 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

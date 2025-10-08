// ============================================
// ARQUIVO: movimentacoesStyles.js
// ============================================

import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const FormContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-top: 40px;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background: ${props => props.bgColor || '#667eea'};
  color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
`;

export const StatValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin: 10px 0;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.95;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 40px;
  text-align: center;
  
  h1 {
    margin: 0 0 8px 0;
    font-size: 2rem;
    font-weight: 700;
  }
  
  p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.95;
  }
`;

export const CardContent = styled.div`
  padding: 40px;
  background: #fafafa;
`;

export const FormSection = styled.div`
  margin-bottom: 35px;
`;

export const SectionTitle = styled.h3`
  color: #667eea;
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #667eea;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const MovimentacaoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MovimentacaoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const MovimentacaoInfo = styled.div`
  flex: 1;
`;

export const MovimentacaoMeta = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const TipoChip = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  background: ${props => props.tipo === 'entrada' ? '#4caf50' : '#f44336'};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

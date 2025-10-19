import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`;

export const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  text-align: center;

  h1 {
    margin: 10px 0;
    font-size: 32px;
    font-weight: 700;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 16px;
  }
`;

export const CardContent = styled.div`
  padding: 40px;
`;

export const FormSection = styled.div`
  margin-bottom: 40px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 15px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #667eea;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const TableContainer = styled.div`
  margin-top: 40px;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
`;

export const FilterContainer = styled.div`
  padding: 20px 30px;
  background: #f8f9fa;
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;

  svg {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.3;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
`;

// Estilos para impressão
export const PrintContainer = styled.div`
  display: none;

  @media print {
    display: block;
    
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

export const PrintHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 3px solid #667eea;

  h1 {
    color: #667eea;
    font-size: 28px;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

export const PrintTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th {
    background: #667eea;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    font-size: 12px;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #ddd;
    font-size: 11px;
  }

  tr:nth-child(even) {
    background: #f8f9fa;
  }
`;

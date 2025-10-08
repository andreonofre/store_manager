// ============================================
// ARQUIVO: cadastroProdutosStyles.js
// ============================================

import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const FormContainer = styled.div`
  max-width: 900px;
  width: 100%;
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

export const ImagePreviewContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  border: 2px dashed #667eea;
`;

export const ImagePreview = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 3px solid #667eea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

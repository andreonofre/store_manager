// ============================================
// ARQUIVO: listarProdutosStyles.js
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
  min-height: 400px;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  flex-shrink: 0;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.h4`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const ProductMeta = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

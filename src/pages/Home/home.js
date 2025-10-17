import React from "react";
import TextField from '@mui/material/TextField';
import listarProdutos from '../ListarProdutos/listarProdutos.js'
import {
  Container,
  SearchContainer,
  WelcomeText,
  SearchBox,
} from "./homeStyles.js";

const Home = () => {
  return (
    <>
      <SearchContainer>
        <WelcomeText>Bem-vindo, User! 👋</WelcomeText>
        <SearchBox>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            size="small"
          />
        </SearchBox>
      </SearchContainer>
      <Container>
        <div>
          {/* Resto do conteúdo do dashboard */}
        </div>
      </Container>
    </>
  );
};

export default Home;

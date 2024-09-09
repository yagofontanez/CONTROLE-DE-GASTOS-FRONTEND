import styled from "styled-components";
import { branco, cinza, verde } from "./utils/colors";

interface ContainerProps {
  overlay?: any;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${verde};

  #overlay {
    display: ${({ overlay }) => (overlay ? "flex" : "none")};
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
  }

  h2 {
    color: ${verde};
  }

  .modal-nome {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${cinza};
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    max-width: 100%;
    width: 90%;
    max-width: 30rem;
    height: 15rem;
    gap: 1rem;
  }

  .button-modal {
    padding: 17px 40px;
    border-radius: 50px;
    cursor: pointer;
    border: 0;
    background-color: white;
    box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 15px;
    transition: all 0.5s ease;
  }

  .button-modal:hover {
    letter-spacing: 3px;
    background-color: ${verde};
    color: hsl(0, 0%, 100%);
    box-shadow: ${verde} 0px 7px 29px 0px;
  }

  .button-modal:active {
    letter-spacing: 3px;
    background-color: ${verde};
    color: hsl(0, 0%, 100%);
    box-shadow: ${verde} 0px 0px 0px 0px;
    transform: translateY(10px);
    transition: 100ms;
  }

  .input {
    width: 320px;
    max-width: 320px;
    height: 25px;
    padding: 12px;
    border-radius: 12px;
    border: 1.5px solid lightgrey;
    outline: none;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0px 0px 20px -18px;
  }

  .input:hover {
    border: 2px solid lightgrey;
    box-shadow: 0px 0px 20px -17px;
  }

  .input:active {
    transform: scale(0.95);
  }

  .input:focus {
    border: 2px solid grey;
  }

  .controle-de-gastos {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    color: ${branco};
    padding: 20px;
  }

  .secoes ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    gap: 1.5rem;

    @media (max-width: 460px) {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  .secoes ul li {
    border-bottom: 0.1rem solid ${verde};
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .secoes ul li:hover {
    border-bottom: 0.1rem solid ${branco};
  }

  .container-gastos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${branco};
    width: 65vw;
    margin: 0 auto;
    padding: 15px;
    border-radius: 15px;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 0.1rem solid ${cinza};
    padding: 1rem;
  }

  .btn {
    display: flex;
    gap: 1rem;
  }

  .add {
    padding: 5px 15px;
    color: ${branco};
    background-color: ${verde};
    height: 40px;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }

  .add:hover {
    background-color: #2b4f11;
  }

  .rmv {
    padding: 5px 15px;
    color: ${branco};
    background-color: ${cinza};
    height: 40px;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }

  .rmv:hover {
    background-color: #7a7878;
  }

  .valor {
    outline: none;
    border: 0.1rem solid ${cinza};
    border-radius: 5px;
    padding: 10px;
    transition: 0.4s ease-in-out;
  }

  .valor:disabled {
    border: 0.1rem solid #f0f0f0;
  }

  .valor:focus {
    border: 0.1rem solid ${verde};
  }

  .inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .inputs button {
    padding: 5px 15px;
    color: ${branco};
    background-color: ${verde};
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }

  .inputs button:hover {
    background-color: #2b4f11;
  }

  .listagem-contas {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .cabecalho {
    display: grid;
    grid-template-columns: minmax(1rem, 1fr) minmax(1rem, 3fr) minmax(1rem, 1fr);
    width: 100%;
    padding: 10px 0;
    font-weight: bold;
  }

  .listagem {
    display: grid;
    grid-template-columns: minmax(1rem, 1fr) minmax(0.5rem, 3fr) minmax(
        1rem,
        1fr
      );
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid ${cinza};
  }

  @media (max-width: 690px) {
    .listagem {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .listagem p {
    margin: 0;
  }

  .acoes {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .total {
    display: grid;
    grid-template-columns: 1fr 4fr;
    width: 100%;
    padding-top: 10px;
    font-weight: bold;

    @media (max-width: 690px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .controle-de-gastos h1 {
    @media (max-width: 690px) {
      font-size: 20px;
    }
  }

  input[type="color"] {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }

  input[type="color"]::-webkit-color-swatch {
    border-radius: 50%;
    border: none;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }

  input[type="color"]::-moz-color-swatch {
    border: none;
    border-radius: 50%;
  }

  .div-buttons-add {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .btn-add-categoria {
    padding: 5px 15px;
    color: ${branco};
    background-color: ${verde};
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }

  .btn-add-categoria:hover {
    background-color: #2b4f11;
  }

  .listagem-transacoes {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 0;
  }

  .listagem-transacoes .cabecalho,
  .listagem-transacoes .transacao,
  .total-saldo {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid ${cinza};
  }

  .total-saldo {
    font-weight: bold;
  }

  @media (max-width: 690px) {
    .listagem-transacoes .cabecalho,
    .listagem-transacoes .transacao,
    .total-saldo {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .listagem-transacoes .transacao p:nth-child(2),
    .total-saldo p:nth-child(2) {
      justify-self: flex-end;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .pagination button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: ${verde};
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .pagination button:disabled {
    background-color: ${cinza};
    cursor: not-allowed;
  }

  .pagination span {
    font-weight: bold;
  }
`;

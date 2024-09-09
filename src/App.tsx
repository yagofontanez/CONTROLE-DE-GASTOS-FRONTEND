import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Container } from "./AppStyle";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useWindowSize } from "@uidotdev/usehooks";

function App() {
  const [modalNome, setModalNome] = useState(true);
  const [nome, setNome] = useState("");
  const [showError, setShowError] = useState(false);
  const [addValue, setAddValue] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [contaNome, setContaNome] = useState("");
  const [categoriaNome, setCategoriaNome] = useState("");
  const [categoriaCor, setCategoriaCor] = useState("");
  const [saldoInicial, setSaldoInicial] = useState("");
  const [contas, setContas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [addValueCat, setAddValueCat] = useState(false);
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [descricao, setDescricao] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState("");
  const [contaSelecionada, setContaSelecionada] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showTransacoes, setShowTransacoes] = useState(true);
  const [showContas, setShowContas] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);

  const inputRef = useRef<any>(null);
  const size = useWindowSize();
  const itemsPerPage = 5;
  const totalSaldo = transacoes.reduce(
    (total, transacao) => total + transacao.valor,
    0
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransacoes = transacoes.slice(indexOfFirstItem, indexOfLastItem);

  const handleGetNome = () => {
    if (!nome) {
      setShowError(true);
      return;
    } else {
      localStorage.setItem("nome", nome);
      setNome(nome);
      toast.success(`Bem vinda, ${nome}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setShowError(false);
      setModalNome(false);
    }
  };

  const handleAddValue = () => {
    setAddValue(true);
  };

  const handleAddValueCategoria = () => {
    setAddValueCat(true);
  };

  const handleCreateConta = async () => {
    try {
      if (!contaNome || !saldoInicial) {
        toast.error("Por favor, preencha todos os campos!");
        return;
      }

      const novaConta = { nome: contaNome, saldo: parseFloat(saldoInicial) };
      const contasAtualizadas = [...contas, novaConta];

      setContas(contasAtualizadas);
      localStorage.setItem("contas", JSON.stringify(contasAtualizadas));

      toast.success("Conta criada com sucesso!");
      setContaNome("");
      setSaldoInicial("");
      setAddValue(false);
    } catch (error) {
      toast.error("Erro ao criar conta!");
    }
  };

  const handleCreateCategoria = async () => {
    try {
      if (!categoriaNome || !categoriaCor) {
        toast.error("Por favor, preencha todos os campos!");
        return;
      }

      const novaCategoria = { nome: categoriaNome, cor: categoriaCor };
      const categoriasAtualizadas = [...categorias, novaCategoria];

      setCategorias(categoriasAtualizadas);
      localStorage.setItem("categorias", JSON.stringify(categoriasAtualizadas));

      toast.success("Categoria criada com sucesso!");
      setCategoriaNome("");
      setCategoriaCor("");
      setAddValueCat(false);
    } catch (e) {
      toast.error("Erro ao criar categoria!");
    }
  };

  const handleCreateTransacao = async () => {
    try {
      if (!valueInput || !descricao || !tipoTransacao || !contaSelecionada) {
        toast.error("Por favor, preencha todos os campos da transação!");
        return;
      }

      const valorTransacao = parseFloat(valueInput);
      const novaTransacao = {
        descricao,
        valor: tipoTransacao === "gasto" ? -valorTransacao : valorTransacao,
        tipo: tipoTransacao,
        conta: contaSelecionada,
        categoria: categoriaNome,
      };

      const contasAtualizadas = contas.map((conta) => {
        if (conta.nome === contaSelecionada) {
          return {
            ...conta,
            saldo:
              tipoTransacao === "gasto"
                ? conta.saldo - valorTransacao
                : conta.saldo + valorTransacao,
          };
        }
        return conta;
      });

      setContas(contasAtualizadas);
      setTransacoes([...transacoes, novaTransacao]);

      localStorage.setItem("contas", JSON.stringify(contasAtualizadas));
      localStorage.setItem(
        "transacoes",
        JSON.stringify([...transacoes, novaTransacao])
      );

      toast.success("Transação adicionada com sucesso!");
      setDescricao("");
      setValueInput("");
      setTipoTransacao("");
      setContaSelecionada("");
      setAddValue(false);
    } catch (error) {
      toast.error("Erro ao criar transação!");
    }
  };

  const handleExpand = (index: number) => {
    setExpanded((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDeleteConta = (index: number) => {
    const contasAtualizadas = contas.filter((_, idx) => idx !== index);
    setContas(contasAtualizadas);
    localStorage.setItem("contas", JSON.stringify(contasAtualizadas));
    toast.success("Conta removida com sucesso!");
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(transacoes.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (addValue && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addValue]);

  useEffect(() => {
    const contasSalvas = localStorage.getItem("contas");
    if (contasSalvas) {
      setContas(JSON.parse(contasSalvas));
    }

    const nomeSalvo = localStorage.getItem("nome");
    if (nomeSalvo) {
      setNome(nomeSalvo);
      setModalNome(false);
    }

    const transacoesSalvas = localStorage.getItem("transacoes");
    if (transacoesSalvas) {
      setTransacoes(JSON.parse(transacoesSalvas));
    }
  }, []);

  return (
    <Container overlay={modalNome}>
      {modalNome && (
        <>
          <div id="overlay"></div>
          <div className="modal-nome">
            <h2>Digite seu nome</h2>
            <input
              placeholder="Digite seu nome..."
              type="text"
              name="text"
              className="input"
              value={nome}
              onChange={(e: any) => {
                setNome(e.target.value);
              }}
            />
            {showError && <p>Por favor, digite um nome!</p>}
            <button className="button-modal" onClick={handleGetNome}>
              Acessar
            </button>
          </div>
        </>
      )}
      {!modalNome && (
        <>
          <div className="controle-de-gastos">
            <h1>{`Bem vinda, ${nome}!`}</h1>
            <div className="secoes">
              <ul>
                <li
                  onClick={() => {
                    setShowTransacoes(true);
                    setShowContas(false);
                    setShowCategorias(false);
                  }}
                >
                  Transações
                </li>
                <li
                  onClick={() => {
                    setShowContas(true);
                    setShowTransacoes(false);
                    setShowCategorias(false);
                  }}
                >
                  Contas
                </li>
                <li
                  onClick={() => {
                    setShowCategorias(true);
                    setShowContas(false);
                    setShowTransacoes(false);
                  }}
                >
                  Categorias
                </li>
              </ul>
            </div>
          </div>
          {showTransacoes && (
            <div className="container-gastos">
              <div className="buttons">
                <div className="btn">
                  <button className="add" onClick={handleAddValue}>
                    Adicionar
                  </button>
                </div>
                {addValue && (
                  <div className="inputs">
                    <input
                      className="valor"
                      type="text"
                      placeholder="Descrição"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                    <input
                      className="valor"
                      type="number"
                      placeholder="Valor"
                      value={valueInput}
                      onChange={(e) => setValueInput(e.target.value)}
                    />
                    <select
                      className="valor"
                      value={tipoTransacao}
                      onChange={(e) => setTipoTransacao(e.target.value)}
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="entrada">Entrada</option>
                      <option value="gasto">Gasto</option>
                    </select>
                    <select
                      className="valor"
                      value={contaSelecionada}
                      onChange={(e) => setContaSelecionada(e.target.value)}
                    >
                      <option value="">Selecione a conta</option>
                      {contas.map((conta: any, idx: number) => (
                        <option key={idx} value={conta.nome}>
                          {conta.nome}
                        </option>
                      ))}
                    </select>
                    <select
                      className="valor"
                      value={categoriaNome}
                      onChange={(e) => setCategoriaNome(e.target.value)}
                    >
                      <option value="">Selecione a categoria</option>
                      {categorias.map((categoria: any, idx: number) => (
                        <option key={idx} value={categoria.nome}>
                          {categoria.nome}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleCreateTransacao}>Adicionar</button>
                  </div>
                )}
              </div>
              <div className="listagem-transacoes">
                <h2>Transações</h2>

                <div className="cabecalho">
                  <p>Descrição</p>
                  <p>Valor</p>
                  <p>Conta</p>
                  <p>Categoria</p>
                </div>

                {currentTransacoes.map((transacao: any, idx: number) => (
                  <div key={idx} className="transacao">
                    <p>{transacao.descricao}</p>
                    <p>
                      {transacao.tipo === "gasto" ? "-" : "+"}R${" "}
                      {Math.abs(transacao.valor).toFixed(2)}
                    </p>
                    <p>{transacao.conta}</p>
                    <p>{transacao.categoria}</p>
                  </div>
                ))}

                <div className="total-saldo">
                  <p>Total</p>
                  <p>R$ {totalSaldo.toFixed(2).replace(".", ",")}</p>
                  <p></p>
                </div>
              </div>
              <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <IoIosArrowBack />
                </button>
                <span>
                  Página {currentPage} de{" "}
                  {Math.ceil(transacoes.length / itemsPerPage)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage === Math.ceil(transacoes.length / itemsPerPage)
                  }
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )}
          {showContas && (
            <div className="container-gastos">
              <div className="buttons">
                <div className="btn">
                  <button className="add" onClick={handleAddValue}>
                    Adicionar Conta
                  </button>
                </div>
                {addValue && (
                  <div className="inputs">
                    <input
                      ref={inputRef}
                      className="valor"
                      type="text"
                      placeholder="Nome da Conta"
                      value={contaNome}
                      onChange={(e: any) => setContaNome(e.target.value)}
                    />
                    <input
                      className="valor"
                      type="number"
                      placeholder="Saldo Inicial"
                      value={saldoInicial}
                      onChange={(e: any) => setSaldoInicial(e.target.value)}
                    />
                    <button onClick={handleCreateConta}>Criar Conta</button>
                  </div>
                )}
              </div>
              <div className="listagem-contas">
                <div className="cabecalho">
                  <p>Conta</p>
                  {size.width! / 16 > 43.125 && <p>Saldo</p>}
                </div>
                {contas.map((conta: any, idx: number) => (
                  <div
                    key={idx}
                    className="listagem"
                    style={{
                      height: expanded === idx ? "8rem" : "auto",
                      flexWrap: expanded === idx ? "wrap" : "inherit",
                    }}
                  >
                    <p
                      style={{
                        width:
                          size.width! / 16 > 25
                            ? expanded === idx
                              ? "95%"
                              : "auto"
                            : expanded === idx
                            ? "50%"
                            : "auto",
                      }}
                    >
                      {conta.nome}
                    </p>
                    {size.width! / 16 > 43.125 && (
                      <p>R$ {conta.saldo.toFixed(2).replace(".", ",")}</p>
                    )}
                    {size.width! / 16 > 43.125 ? (
                      <div className="acoes">
                        <FaTrash onClick={() => handleDeleteConta(idx)} />
                      </div>
                    ) : (
                      <IoIosArrowDown onClick={() => handleExpand(idx)} />
                    )}
                    {expanded === idx && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <p>R$ {conta.saldo.toFixed(2).replace(".", ",")}</p>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                          }}
                        >
                          <FaTrash onClick={() => handleExpand(idx)} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="total">
                  <p>Total Saldo</p>
                  <p>R$ {totalSaldo.toFixed(2).replace(".", ",")}</p>
                </div>
              </div>
            </div>
          )}
          {showCategorias && (
            <div className="container-gastos">
              <div className="buttons">
                <div className="btn">
                  <button className="add" onClick={handleAddValueCategoria}>
                    Adicionar Categoria
                  </button>
                </div>
                {addValueCat && (
                  <div className="div-buttons-add">
                    <input
                      ref={inputRef}
                      className="valor"
                      type="text"
                      placeholder="Categoria"
                      value={categoriaNome}
                      onChange={(e: any) => setCategoriaNome(e.target.value)}
                    />
                    <input
                      type="color"
                      value={categoriaCor}
                      onChange={(e: any) => setCategoriaCor(e.target.value)}
                    />
                    <button
                      className="btn-add-categoria"
                      onClick={handleCreateCategoria}
                    >
                      Adicionar
                    </button>
                  </div>
                )}
              </div>
              <div className="listagem-contas">
                <div className="cabecalho">
                  <p
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Categoria
                  </p>
                  <p
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    Cor
                  </p>
                </div>
                {categorias.map((categoria: any, idx: number) => (
                  <div key={idx} className="listagem">
                    <p>{categoria.nome}</p>
                    <div
                      style={{
                        backgroundColor: categoria.cor,
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </Container>
  );
}

export default App;

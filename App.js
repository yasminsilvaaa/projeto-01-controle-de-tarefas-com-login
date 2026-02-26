import React, { useState } from 'react';
import LoginScreen from './src/pages/login';
import TarefasScreen from './src/pages/tarefas';

export default function App() {
  const [tela, setTela] = useState('login');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  function entrar() {
    setTela('tarefas');
  }

  function sair() {
    setTela('login');
  }

  function adicionarTarefa() {
    if (novaTarefa.trim() === '') return;

    const existe = tarefas.some(
      t => t.texto.toLowerCase() === novaTarefa.toLowerCase()
    );

    if (existe) {
      alert('Essa tarefa ja existe');
      return;
    }

    setTarefas([
      ...tarefas,
      { id: Date.now().toString(), texto: novaTarefa, concluida: false }
    ]);

    setNovaTarefa('');
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter(t => t.id !== id));
  }

  function toggleConcluida(id) {
    setTarefas(
      tarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  }

  function limparConcluidas() {
    setTarefas(tarefas.filter(t => !t.concluida));
  }

  if (tela === 'login') {
    return (
      <LoginScreen
        usuario={usuario}
        senha={senha}
        setUsuario={setUsuario}
        setSenha={setSenha}
        entrar={entrar}
      />
    );
  }

  return (
    <TarefasScreen
      novaTarefa={novaTarefa}
      setNovaTarefa={setNovaTarefa}
      tarefas={tarefas}
      adicionarTarefa={adicionarTarefa}
      removerTarefa={removerTarefa}
      toggleConcluida={toggleConcluida}
      limparConcluidas={limparConcluidas}
      sair={sair}
    />
  );
}
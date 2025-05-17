import { Header } from "./components/Header";
import { Button } from "./components/ui/button";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col justify-start gap-20 items-center h-screen w-screen bg-cyan-700">
      <Header label="LISTA DE USUÁRIOS" />

      <div className="w-[80%] flex flex-col gap-10">
        <Button className="bg-green-600 p-5 w-32">Novo</Button>

        <table className="border-1 bg-cyan-50 child">
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Opções</th>
          </tr>
          <tr>
            <td>Maria</td>
            <td>maria@gmail.com</td>
            <td>
              <button onClick={() => {}}>up</button>
              <button onClick={() => {}}>del</button>
            </td>
          </tr>
          <tr>
            <td>joao</td>
            <td>joao@gmail.com</td>
            <td>
              <button onClick={() => {}}>up</button>
              <button onClick={() => {}}>del</button>
            </td>
          </tr>
          <tr>
            <td>pedro</td>
            <td>pedro@gmail.com</td>
            <td>
              <button onClick={() => {}}>up</button>
              <button onClick={() => {}}>del</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;

import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "./api/axios";
import { Header } from "./components/Header";
import { Button } from "./components/ui/button";
import "./index.css";

type UserProps = {
  id: number;
  name: string;
  email: string;
  status?: string;
  password?: string;
};

function App() {
  const [users, setUsers] = useState<UserProps[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      console.error("Some error ocurred: ", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers([...users].filter((u) => u.id !== id));
      fetchUsers();
    } catch (error) {
      console.error("Some error ocurred: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-start gap-20 items-center h-screen w-screen bg-cyan-700">
      <Header label="LISTA DE USUÁRIOS" />

      <div className="w-1/2 flex flex-col gap-10">
        <Button className="bg-green-600 p-5 w-32 text-xl cursor-pointer">
          Novo
        </Button>

        <table className="flex flex-col border overflow-hidden border-black bg-cyan-50 items-center rounded-sm shadow-2xl">
          <thead className="w-full">
            <tr className="grid grid-cols-3 [&>*]:py-1 [&>*]:text-xl [&>*]:font-semibold bg-cyan-800 text-white">
              <th>Nome</th>
              <th className=" border-x-[1px] border-black">E-mail</th>
              <th className="">Opções</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users.map(({ id, name, email }, i) => (
              <tr
                className={
                  "grid grid-cols-3 border-t items-center border-black [&>*]:py-2 [&>*]:text-center [&>*]:text-lg"
                }
                key={i}
              >
                <td className="">{name}</td>
                <td className="border-x-[1px] border-black">{email}</td>
                <td className="flex flex-row justify-center gap-5 items-center -my-1.5">
                  <button
                    onClick={() => {}}
                    className="bg-cyan-700 size-8 rounded-sm flex items-center justify-center cursor-pointer"
                  >
                    <Pencil size={24} color="white" />
                  </button>
                  <button
                    onClick={() => deleteUser(id)}
                    className="bg-red-700 size-8 rounded-sm flex items-center justify-center cursor-pointer"
                  >
                    <Trash size={24} color="white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

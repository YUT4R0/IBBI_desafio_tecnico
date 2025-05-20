import { api } from "@/api/axios";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "@/index.css";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

type UserProps = {
  id: number;
  name: string;
  email: string;
  status: string;
  password: string;
};

const userFormSchema = z.object({
  name: z.string().min(3).max(150),
  email: z.string().email().max(20),
  password: z.string().min(8),
  status: z.string(),
});

type UserFormProps = z.infer<typeof userFormSchema>;

export function UsersPage() {
  const [users, setUsers] = useState<UserProps[]>([]);
  // handle user creation/edition
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<UserFormProps>({
    resolver: zodResolver(userFormSchema),
  });

  const fetchUsers = async () => {
    try {
      const { data, status } = await api.get("/users");
      if (status === 200) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Some error ocurred: ", error);
    }
  };

  const handleDeleteUser = async (user: UserProps) => {
    try {
      const { status } = await api.delete(`/users/${user.id}`);
      if (status === 201) {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        setIsDeletionModalOpen(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Some error ocurred: ", error);
    }
  };

  const handleCreateUser = async (data: UserFormProps) => {
    try {
      const { status } = await api.post("/users", data);
      if (status === 201) {
        setisModalOpen(false);
        reset();
        fetchUsers();
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdateUser = async (data: UserProps) => {
    try {
      const { status } = await api.patch("/users", data);
      if (status === 201) {
        setisModalOpen(false);
        reset();
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<UserFormProps> = async (data) => {
    if (user) {
      const updatedUser: UserProps = { id: user.id, ...data };
      await handleUpdateUser(updatedUser);
    } else {
      await handleCreateUser(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (user && isModalOpen) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("password", user.password);
      setValue("status", user.status);
    } else if (!isModalOpen && !isDeletionModalOpen) {
      reset();
      setUser(null);
    }
  }, [isDeletionModalOpen, isModalOpen, reset, setValue, user]);

  return (
    <>
      <div className="flex flex-col justify-start gap-20 items-center h-screen w-screen bg-cyan-700">
        <Header label="LISTA DE USUÁRIOS" />

        <div className="w-1/2 flex flex-col gap-10">
          <Button
            className="bg-green-600 p-5 w-32 text-xl cursor-pointer"
            onClick={() => {
              setisModalOpen(true);
            }}
          >
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
              {users.map((user, i) => (
                <tr
                  className={
                    "grid grid-cols-3 border-t items-center border-black [&>*]:py-2 [&>*]:text-center [&>*]:text-lg"
                  }
                  key={i}
                >
                  <td className="">{user.name}</td>
                  <td className="border-x-[1px] border-black">{user.email}</td>
                  <td className="flex flex-row justify-center gap-5 items-center -my-1.5">
                    <button
                      onClick={() => {
                        setUser(user);
                        setisModalOpen(true);
                      }}
                      className="bg-cyan-700 size-8 rounded-sm flex items-center justify-center cursor-pointer"
                    >
                      <Pencil size={24} color="white" />
                    </button>
                    <button
                      onClick={() => {
                        setUser(user);
                        setIsDeletionModalOpen(true);
                      }}
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

      {/* Modal de Criação/atualização de usuário */}
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <DialogContent className="w-1/3 flex flex-col items-center max-h-[90vh] gap-0 py-0 overflow-hidden px-4 border-0">
          <div className="relative w-full h-0" />
          <div className="bg-cyan-400 w-full absolute h-12 flex items-center justify-between px-4 text-black font-bold text-lg">
            <span className="mx-auto">
              {user ? "Atualizar Usuário" : "Cadastro de Usuário"}
            </span>
          </div>
          <div className="flex w-full overflow-auto flex-col justify-between gap-2 items-center mt-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-6 flex flex-col w-full py-4 overflow-y-auto"
            >
              <div className="flex flex-col items-start mt-4 gap-3">
                <div className="flex flex-col gap-0.5 w-full">
                  <label className="text-base font-normal">Nome</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="De 3 a 150 caracteres"
                    min={3}
                    max={150}
                    className="border p-2 rounded-md w-full bg-gray-200"
                  />
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <label className="text-base font-normal">E-mail</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="de até 20 caracteres"
                    max={20}
                    className="border p-2 rounded-md w-full bg-gray-200"
                  />
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <label className="text-base font-normal">Senha</label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="pelo menos caracteres"
                    min={8}
                    className="border p-2 rounded-md w-full bg-gray-200"
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <label className="text-base font-normal">Status:</label>
                  <select
                    {...register("status")}
                    className="border-1 border-gray-500 p-0.5 rounded-md"
                    defaultValue={"ativo"}
                  >
                    <option className="" value="ativo">
                      Ativo
                    </option>
                    <option className="" value="excluido">
                      Excluido
                    </option>
                  </select>
                </div>
                <Button
                  type="submit"
                  className="border text-white bg-cyan-700 rounded-md mt-4"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeletionModalOpen} onOpenChange={setIsDeletionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tem certeza que deseja excluir o usuário "{user?.name}"?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDeletionModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (user) handleDeleteUser(user);
              }}
              variant={"destructive"}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

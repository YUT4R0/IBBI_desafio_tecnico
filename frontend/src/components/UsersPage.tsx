import { api } from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "@/index.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type UserProps = {
  id: number;
  name: string;
  email: string;
  status: string;
  password: string;
};

const userFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome curto demais")
    .max(150, "Nome muito longo (+150 caracteres)"),
  email: z.string().email().max(20, "E-mail muito longo (+20 caracteres)"),
  password: z.string().min(8, "Senha curta demais"),
  status: z.string(),
});

type UserFormProps = z.infer<typeof userFormSchema>;

export function UsersPage() {
  const [users, setUsers] = useState<UserProps[]>([]);
  // handle user creation/edition
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormProps>({
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
        toast.success("Usuário excluído com sucesso!");
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
        toast.success("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      setIsErrorModalOpen(true);
    }
  };

  const handleUpdateUser = async (data: UserProps) => {
    try {
      const { status } = await api.patch("/users", data);
      if (status === 201) {
        setisModalOpen(false);
        reset();
        fetchUsers();
        toast.success("Usuário atualizado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      setIsErrorModalOpen(true);
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
      <div className="flex flex-col relative justify-between items-center overflow-x-hidden no-scrollbar h-screen w-screen bg-cyan-700">
        <header className="flex justify-center top-0 fixed items-center w-full h-16 bg-cyan-900 font-semibold text-2xl text-white">
          LISTA DE USUÁRIOS
        </header>

        <div className="w-[60%] mt-40 pb-4 flex flex-col gap-10">
          <Button
            className="bg-green-600 p-5 w-40 text-xl cursor-pointer"
            onClick={() => {
              setisModalOpen(true);
            }}
          >
            Novo Usuário
          </Button>

          <div className="flex flex-col w-full justify-center items-center gap-2">
            <table className="w-full flex flex-col border overflow-hidden border-black bg-cyan-50 items-center rounded-sm shadow-2xl">
              <thead className="w-full">
                <tr className="grid grid-cols-4 [&>*]:py-1 [&>*]:text-xl [&>*]:font-semibold bg-cyan-800 text-white">
                  <th className="border-r-[1px] border-black">Nome</th>
                  <th className="border-r-[1px] border-black">E-mail</th>
                  <th className="border-r-[1px] border-black">Status</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {users.length > 0 ? (
                  users.map((user, i) => (
                    <tr
                      className="grid grid-cols-4 border-t items-center border-black [&>*]:py-2 [&>*]:text-center [&>*]:text-lg"
                      key={i}
                    >
                      <td className="border-r-[1px] border-black">
                        {user.name}
                      </td>
                      <td className="border-r-[1px] border-black">
                        {user.email}
                      </td>
                      <td
                        className={`border-r-[1px] border-black uppercase ${
                          user.status === "ativo"
                            ? "text-green-700"
                            : "text-red-700"
                        } `}
                      >
                        {user.status}
                      </td>
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
                  ))
                ) : (
                  <div className="flex bg-white justify-center items-center border-t border-black py-2">
                    <span className="opacity-70">
                      Nenhum usuário cadastrado.
                    </span>
                  </div>
                )}
              </tbody>
            </table>
            <div className="text-cyan-50/70">
              Usuários cadastrados: {users.length}
            </div>
          </div>
        </div>
        <footer className="flex text-base justify-center shrink-0 items-center w-full h-14 border-t shadow-black shadow-2xl border-cyan-800 font-semibold  text-cyan-200/80">
          Feito por Pedro Yutaro 🐺💚
        </footer>
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
                  <label className="text-base font-normal">Nome:</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="De 3 a 150 caracteres"
                    min={3}
                    max={150}
                    className="border p-2 rounded-md w-full bg-gray-200"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 -mt-0.5">
                      {errors.name.message} *
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <label className="text-base font-normal">E-mail:</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Até 20 caracteres"
                    max={20}
                    className="border p-2 rounded-md w-full bg-gray-200"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 -mt-0.5">
                      {errors.email.message} *
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 w-full">
                  <label className="text-base font-normal">Senha:</label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Minimo 8 caracteres"
                    min={8}
                    className="border p-2 rounded-md w-full bg-gray-200"
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500 -mt-0.5">
                      {errors.password.message} *
                    </span>
                  )}
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
                <div className="flex w-full items-center justify-between">
                  <Button
                    type="button"
                    variant={"destructive"}
                    className="border rounded-md mt-4 text-md"
                    onClick={() => setisModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="border text-white bg-cyan-700 rounded-md mt-4 text-md"
                  >
                    {user ? "Atualizar" : "Cadastrar"} usuário
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confimar Deleção */}
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

      {/* Modal de erro */}
      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Falha ao tentar {user ? "atualizar" : "criar"} usuário
            </DialogTitle>
            <DialogDescription>
              Login já consta no sistema (ou verifique a sua conexão com a
              internet e tente novamente mais tarde).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"destructive"}
              onClick={() => setIsErrorModalOpen(false)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

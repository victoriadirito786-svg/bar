import { useState } from "react";
import { type Checkout, type Pagamento, type Ritiro } from "../types";
import { cn } from "../utils/cn";

type CheckoutFormProps = {
  orderEmpty: boolean;
  onConfirm: (checkout: Checkout) => void;
};

type Errors = {
  nome: string[];
  classe: string[];
  note: string[];
};

export function CheckoutForm({ orderEmpty, onConfirm }: CheckoutFormProps) {
  const [form, setForm] = useState<Checkout>({
    nome: "",
    classe: "",
    ritiro: "ricreazione",
    pagamento: "contanti",
    note: "",
  });
  const [errors, setErrors] = useState<Errors>({
    nome: [],
    classe: [],
    note: [],
  });

  function OnSubmit() {
    let nomeErrors: string[] = [];
    let classeErrors: string[] = [];
    let noteErrors: string[] = [];

    if (form.nome === "") {
      nomeErrors = [...nomeErrors, "Il nome è obbligatorio"];
    }
    if (form.nome !== "" && form.nome.length < 2) {
      nomeErrors = [...nomeErrors, "Il nome deve avere almeno 2 caratteri"];
    }
    if (/\d/.test(form.nome)) {
      nomeErrors = [...nomeErrors, "Il nome non può contenere numeri"];
    }

    if (form.classe === "") {
      classeErrors = [...classeErrors, "La classe è obbligatoria"];
    }
    if (form.classe !== "" && !/^[1-5][A-Z]$/.test(form.classe)) {
      classeErrors = [
        ...classeErrors,
        "La classe deve essere un numero da 1 a 5 seguito da una lettera maiuscola (es. 4B)",
      ];
    }

    if (form.note.length > 100) {
      noteErrors = [
        ...noteErrors,
        "Le note possono avere al massimo 100 caratteri",
      ];
    }

    setErrors({ nome: nomeErrors, classe: classeErrors, note: noteErrors });

    if (
      nomeErrors.length > 0 ||
      classeErrors.length > 0 ||
      noteErrors.length > 0
    ) {
      return;
    }

    onConfirm(form);
    setForm({
      nome: "",
      classe: "",
      ritiro: "ricreazione",
      pagamento: "contanti",
      note: "",
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        OnSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <h1 className="font-bold text-center text-xl">Conferma ordine</h1>

      <input
        placeholder="Nome"
        value={form.nome}
        onChange={(e) => setForm((prev) => ({ ...prev, nome: e.target.value }))}
        className="bg-gray-200 p-2 rounded-lg"
      ></input>
      {errors.nome.map((error) => (
        <p key={error} className="text-red-500">
          {error}
        </p>
      ))}

      <input
        placeholder="Classe (es. 4B)"
        value={form.classe}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, classe: e.target.value }))
        }
        className="bg-gray-200 p-2 rounded-lg"
      ></input>
      {errors.classe.map((error) => (
        <p key={error} className="text-red-500">
          {error}
        </p>
      ))}

      <div className="flex gap-4">
        {["ricreazione", "pranzo"].map((ritiro) => (
          <button
            key={ritiro}
            type="button"
            className={cn("px-4 py-2 bg-gray-400 rounded-full", {
              "bg-blue-400": form.ritiro === ritiro,
            })}
            onClick={() =>
              setForm((prev) => ({ ...prev, ritiro: ritiro as Ritiro }))
            }
          >
            {ritiro}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {["contanti", "carta"].map((pagamento) => (
          <button
            key={pagamento}
            type="button"
            className={cn("px-4 py-2 bg-gray-400 rounded-full", {
              "bg-blue-400": form.pagamento === pagamento,
            })}
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                pagamento: pagamento as Pagamento,
              }))
            }
          >
            {pagamento}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Note (facoltative)"
        value={form.note}
        onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
        className="bg-gray-200 p-2 rounded-lg resize-none"
      ></textarea>
      {errors.note.map((error) => (
        <p key={error} className="text-red-500">
          {error}
        </p>
      ))}

      <button
        type="submit"
        disabled={orderEmpty}
        className={cn("rounded-full px-4 py-2 bg-blue-400", {
          "bg-gray-400": orderEmpty,
        })}
      >
        Conferma ordine
      </button>
    </form>
  );
}
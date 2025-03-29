"use client";

import Container from "@/components/elements/container";
import { Button } from "@/components/elements/form/button";
import CopyTextField from "@/components/elements/form/copyTextFiels";
import { storageAuthTokenGet } from "@/storage/authToken";
import { useEffect, useState } from "react";

type StatesResponse = {
  estados: {
    sigla: string;
    nome: string;
    cidades: string[];
  }[];
};

export default function Commissionary() {
  const [uniqueCode, setUniqueCode] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    const storedToken = storageAuthTokenGet();
    if (!storedToken) {
      setError("Token não encontrado. Faça login novamente.");
    } else {
      setToken(storedToken);
    }
  }, []);

  async function handleCreateKey() {
    setError("");
    setUniqueCode("");

    if (!token) {
      setError("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch("/api/users/commissionaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar a chave");
      }

      setUniqueCode(data.uniqueCode);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    }
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-5 text-[#4338ca]">
        Gerar chave unica
      </h2>

      <CopyTextField uniqueCode={uniqueCode} />

      <Button onClick={handleCreateKey}>
        <span className="text-white py-1">Gerar chave</span>
      </Button>
    </Container>
  );
}

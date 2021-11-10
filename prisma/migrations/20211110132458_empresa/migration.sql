-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "idEstrangeira" INTEGER,
    "cnpj" TEXT,
    "estrangeira" BOOLEAN NOT NULL DEFAULT false,
    "nomeFantasia" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "anoDeFundacao" INTEGER NOT NULL,
    "cnae" TEXT,
    "tipoSocietario" TEXT,
    "situacaoReceita" TEXT,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_idEstrangeira_key" ON "Empresa"("idEstrangeira");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

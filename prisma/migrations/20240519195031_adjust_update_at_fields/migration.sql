-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_estados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sigla" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL
);
INSERT INTO "new_estados" ("atualizado_em", "criado_em", "id", "sigla") SELECT "atualizado_em", "criado_em", "id", "sigla" FROM "estados";
DROP TABLE "estados";
ALTER TABLE "new_estados" RENAME TO "estados";
CREATE TABLE "new_enderecos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "logradouro" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade_id" INTEGER NOT NULL,
    "perfil_id" INTEGER NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL,
    CONSTRAINT "enderecos_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "cidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enderecos_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_enderecos" ("atualizado_em", "bairro", "cep", "cidade_id", "criado_em", "id", "logradouro", "numero", "perfil_id") SELECT "atualizado_em", "bairro", "cep", "cidade_id", "criado_em", "id", "logradouro", "numero", "perfil_id" FROM "enderecos";
DROP TABLE "enderecos";
ALTER TABLE "new_enderecos" RENAME TO "enderecos";
CREATE TABLE "new_cidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "estado_id" INTEGER NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL,
    CONSTRAINT "cidades_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estados" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cidades" ("atualizado_em", "criado_em", "estado_id", "id", "nome") SELECT "atualizado_em", "criado_em", "estado_id", "id", "nome" FROM "cidades";
DROP TABLE "cidades";
ALTER TABLE "new_cidades" RENAME TO "cidades";
CREATE UNIQUE INDEX "cidades_nome_estado_id_key" ON "cidades"("nome", "estado_id");
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL
);
INSERT INTO "new_usuarios" ("atualizado_em", "criado_em", "email", "id", "senha") SELECT "atualizado_em", "criado_em", "email", "id", "senha" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
CREATE TABLE "new_perfis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "data_nasc" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "signo" TEXT NOT NULL,
    "mae" TEXT NOT NULL,
    "pai" TEXT NOT NULL,
    "telefone_fixo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "tipo_sanguineo" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL,
    CONSTRAINT "perfis_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_perfis" ("altura", "atualizado_em", "celular", "cor", "cpf", "criado_em", "data_nasc", "id", "idade", "mae", "nome", "pai", "peso", "rg", "sexo", "signo", "telefone_fixo", "tipo_sanguineo", "usuario_id") SELECT "altura", "atualizado_em", "celular", "cor", "cpf", "criado_em", "data_nasc", "id", "idade", "mae", "nome", "pai", "peso", "rg", "sexo", "signo", "telefone_fixo", "tipo_sanguineo", "usuario_id" FROM "perfis";
DROP TABLE "perfis";
ALTER TABLE "new_perfis" RENAME TO "perfis";
CREATE UNIQUE INDEX "perfis_usuario_id_key" ON "perfis"("usuario_id");
PRAGMA foreign_key_check("estados");
PRAGMA foreign_key_check("enderecos");
PRAGMA foreign_key_check("cidades");
PRAGMA foreign_key_check("usuarios");
PRAGMA foreign_key_check("perfis");
PRAGMA foreign_keys=ON;

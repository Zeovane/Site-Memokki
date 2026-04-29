# Memokki

Loja online de colecionaveis com layout responsivo, catalogo de produtos e carrinho de compras leve.

## Como usar

1. Instale as dependencias:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra `http://127.0.0.1:3000` no navegador.

## Firebase

O projeto ja esta preparado para inicializar o Firebase no navegador usando o SDK modular oficial.

1. Crie um projeto no Firebase Console.
2. Adicione um app Web ao projeto.
3. Copie as credenciais exibidas pelo Firebase.
4. Preencha o arquivo `firebase-config.js` com os valores do seu projeto.
5. Rode `npm run dev` para testar localmente.

Apos preencher o arquivo, o Firebase sera inicializado automaticamente em `firebase-init.js`.
As instancias ficam disponiveis em `window.firebaseServices`, o que facilita adicionar login com Firebase Auth depois.

## O que esta incluido

- `index.html` - pagina principal com navegacao entre secoes.
- `styles.css` - estilo moderno e responsivo.
- `script.js` - logica de catalogo, filtros, busca e carrinho.
- `firebase-config.js` - configuracao do projeto Firebase.
- `firebase-init.js` - inicializa o Firebase e deixa Auth pronto para uso futuro.
- `package.json` - configuracoes e script de desenvolvimento.

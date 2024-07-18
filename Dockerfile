# Usar a imagem base oficial do Node.js
FROM node:14
# Definir o diretório de trabalho no container
# Definir o diretório de trabalho no container
WORKDIR /app
# Copiar package.json e package-lock.json
COPY package*.json ./
# Instalar as dependências do projeto
RUN npm install

COPY . .

# Expor a porta que a aplicação vai rodar
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["node", "server.js"]
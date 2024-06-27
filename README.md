# GestorFinanceiro
------------------------------
Aplicativo para gestão financeira. 
------------------------------
Tecnologias utilizadas: HTML, CSS, Bootstrap, Javascript, PHP, SQLite.

### PASSO A PASSO PARA EXECUTAR O APLICATIVO

1. Clone o repositorio: `git clone https://github.com/benattimatheus/GestorFinanceiro.git`
2. Entre da pasta: `cd GestorFinanceiro` 
3. Rode o comando: `composer install` 
4. Utilize o servidor de desenvolvimento do PHP: `php -S localhost:8080`
5. Abra o navegador no endereço `http://localhost:8080`

---

## BANCO DE DADOS

*O aplicativo utiliza o PDO, para criar a conexão com o banco e uma abstração na camada de modelo que facilita muito o processo de desenvolvimento.*
Para ativar o SQLite no PHP é preciso:
1. Abra a pasta onde o PHP está instalado
2. Procure pelo arquivo `PHP.INI`
3. Abra esse arquivo na sua IDE
4. Procure por ;extension = pdo_sqlite
5. Exclua o ;

### SEPARÇÃO DE ARQUIVOS:
- Todos controllers para gerenciamento de requisiçao devem estar na pasta (src/controller)
- O banco de dados e a abertura de instância de banco de dados devem estar na pasta (src/database)
- Models para a lógica de negócio e interação com banco de dados devem estar na pasta de models a unica obrigação da classe
- Models implementam métodos basicos para CRUD em cima do PDO.
- Os arquivos acessíveis publicamente de estilização devem estar na pasta (src/public)
- Views devem ficar na pasta (src/views)

Desenvolvido por <br>
[Julia Layz](https://github.com/JuliaLayz "Julia Layz"). 23347625-2<br>
[Leonardo Póss](https://github.com/LeonardoPoss "Leonardo Póss"). 22013563-2<br>
[Luciano Franzoi](https://github.com/Luciano-Franzoi-Filho "Luciano Franzoi"). 22021768-2<br>
[Matheus Benatti](https://github.com/benattimatheus "Matheus Benatti"). 22066197-2<br>
[Phelipe Barreto](https://github.com/phebarreto0512 "Phelipe Barreto"). 22079206-2<br>
[Rafaela Gonzatto](https://github.com/rafaelagonzatto "Rafaela Gonzatto"). 23298343-2<br>

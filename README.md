# 🚀 Gestor de Pessoas TEDI

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

> Um sistema completo para gestão de membros, alunos e eventos acadêmicos, desenvolvido com arquitetura moderna baseada em microsserviços e nuvem.

## 📖 Sobre o Projeto

O **Gestor TEDI** é uma aplicação Full-Stack desenvolvida para gerenciar as atividades de um projeto da UTFPR-CP. O sistema permite o cadastro de alunos e membros da equipe, além da criação e gerenciamento de aulas e eventos, controlando a presença e participação através de relacionamentos complexos (Many-to-Many).


## 🛠️ Tecnologias e Frameworks

### Backend (API REST)
* **Java 17 (LTS):** Linguagem base robusta e moderna.
* **Spring Boot 3:** Framework principal para configuração automática e injeção de dependências.
* **Spring Data JPA:** Abstração para persistência de dados e repositórios.
* **Hibernate:** Implementação JPA para ORM (Object-Relational Mapping).
* **H2 Database:** Banco de dados em memória para testes rápidos e desenvolvimento local.
* **MySQL Driver:** Conector para banco de dados de produção.
* **Lombok:** Redução de código boilerplate (Getters, Setters, Builders).
* **Bean Validation:** Validação de dados de entrada (DTOs) com anotações.
* **Maven:** Gerenciador de dependências e build.

### Frontend (SPA - Single Page Application)
* **HTML5 & CSS3:** Estrutura semântica e estilização responsiva.
* **Sem Frameworks:** Frontend leve ("Vanilla JS") para alta performance e aprendizado dos fundamentos web.

### Infraestrutura & DevOps
* **Docker:** Containerização da aplicação (Multi-stage build) para garantir portabilidade.
* **Render:** Plataforma de Nuvem (PaaS) para hospedagem do Backend Dockerizado.
* **Railway:** Serviço de banco de dados MySQL na nuvem.
* **Netlify:** Hospedagem do Frontend estático com CI/CD.

---

## ⚙️ Arquitetura do Sistema

O projeto segue o padrão de camadas (Layered Architecture) e DTO Pattern:

1.  **Controller Layer (`infrastructure/controller`):** Expõe os endpoints REST (JSON).
2.  **DTO Layer (`infrastructure/dtos`):** Objetos de transferência de dados para desacoplar a API das entidades.
3.  **Service Layer (`domain/service`):** Regras de negócio, validações e transações (`@Transactional`).
4.  **Repository Layer (`domain/repository`):** Comunicação direta com o banco de dados.
5.  **Entity Layer (`domain/entity`):** Mapeamento das tabelas do banco.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
* Java 17 SDK instalado.
* Maven instalado.
* MySQL (Opcional, caso queira rodar com banco real localmente).

### 1. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/Gestor-de-Pessoas-TEDI.git](https://github.com/seu-usuario/Gestor-de-Pessoas-TEDI.git)
cd Gestor-de-Pessoas-TEDI

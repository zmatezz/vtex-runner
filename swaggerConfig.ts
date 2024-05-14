import swaggerJsdoc from 'swagger-jsdoc';
import * as path from 'path';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Runner VTEX',
      version: '1.0.0',
      description: 'Este projeto consiste em uma aplicação desenvolvida para facilitar e acelerar a execução de atividades diárias na plataforma VTEX. A aplicação opera de forma dinâmica, realizando solicitações HTTP para os endpoints específicos das APIs da VTEX. Basicamente, a aplicação automatiza tarefas e elimina a necessidade de intervenção manual em determinadas atividades rotineiras. Isso resulta em processos mais eficientes e escaláveis para operações diárias na plataforma VTEX.',
    },
  },
  apis: [
    path.join(__dirname, 'assets/docs/**/*.ts')
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

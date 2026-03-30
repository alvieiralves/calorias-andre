# Controle de Déficit Calórico

Aplicação web em React + Vite para registrar alimentos, monitorar macros e acompanhar evolução de peso.

## Funcionalidades

- Cálculo de TMB e gasto calórico diário com fator de atividade.
- Definição de meta diária com déficit calórico.
- Registro de alimentos por refeição com cálculo automático de calorias, proteína, carboidrato e gordura.
- Cadastro e remoção de alimentos personalizados.
- Histórico diário de consumo e peso salvo em `localStorage`.
- Gráficos de calorias/dia e peso ao longo do tempo.
- Suporte PWA (instalável).

## Requisitos

- Node.js 20+
- npm 10+

## Como rodar

```bash
npm install
npm run dev
```

Acesse a URL mostrada no terminal (normalmente `http://localhost:5173`).

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção
- `npm run preview`: pré-visualização do build
- `npm run lint`: análise estática com ESLint
- `npm run test`: testes unitários (Node Test Runner)

## Estrutura (resumo)

- `src/App.jsx`: composição principal da aplicação.
- `src/components/*`: componentes de UI por domínio.
- `src/utils/nutrition.js`: regras de cálculo nutricional.
- `src/utils/storage.js`: utilitários de persistência segura.

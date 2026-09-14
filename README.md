# Kape Ko

SONG Commerce AI Labs - Track A, Season 1

A Node.js and React TypeScript learning project for building AI-powered
e-commerce features for Kape Ko.

## Levels

- [Level 2](./level-2/README.md) - Catalog and content services
- [Level 3](./level-3/README.md) - Chat and RAG services
- [Level 4](./level-4/README.md) - Order and multi-agent services

## Project Structure

Each level contains:

- `backend/` - Node.js API server
- `frontend/` - React and TypeScript application
- `data/` - Sample product data
- Learner workbook and sample solution documents

## Learning Materials

- [Level 2 workbook](./level-2/SONG_Level2_LearnerWorkbook.docx)
- [Level 2 sample solution](./level-2/SONG_Level2_SampleSolution.docx)
- [Level 3 and 4 workbook](./level-3/SONG_Level3_4_LearnerWorkbook.docx)
- [Level 3 and 4 sample solution](./level-3/SONG_Level3_4_SampleSolution.docx)

## Running a Level

Choose a level, then run the backend and frontend separately.

### Backend

```bash
cd level-4/backend
npm install
npm run dev
```

### Frontend

In another terminal:

```bash
cd level-4/frontend
npm install
npm run dev -- --host
```

Replace `level-4` with `level-2` or `level-3` as needed.

## API Features

- Catalog generation
- Product listing and search
- AI chat
- Product recommendations
- Order agent
- Multi-agent catalog pipeline
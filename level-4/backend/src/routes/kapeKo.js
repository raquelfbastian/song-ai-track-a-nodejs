// routes/kapeKo.js — Track A (Node.js)
// Same REST endpoints as KapeKoController.java in Track B/C
//
// Lab 3: POST /api/catalog/generate  GET /api/catalog
// Lab 4: POST /api/products/:id/enrich  POST /api/catalog/enrich-all
// Lab 5: GET /api/products  GET /api/products/:id
// Health: GET /api/health

const express        = require('express');
const router         = express.Router();
const catalogService = require('../services/catalogService');
const contentService = require('../services/contentService');

// ── Health ─────────────────────────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Kape Ko Commerce API',
    track: 'Track A — Node.js + Express',
    version: '1.0.0 — SONG Level 2',
  });
});

// ── Lab 3: Catalog Builder ─────────────────────────────────────────────────

/**
 * POST /api/catalog/generate
 * Calls LLM API → generates structured catalog → saves to catalog.json
 */
router.post('/catalog/generate', async (req, res) => {
  try {
    const products = await catalogService.generateCatalog();
    res.json({ message: 'Catalog generated successfully', count: products.length, products });
  } catch (err) {
    console.error('Catalog generate error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/catalog
 * Returns existing catalog. Auto-generates if not yet created.
 */
router.get('/catalog', async (req, res) => {
  try {
    const products = await catalogService.getCatalog();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Lab 4: Content Studio ──────────────────────────────────────────────────

/**
 * POST /api/products/:id/enrich
 * Enriches one product with AI-generated SEO, description, hook, bullets
 */
router.post('/products/:id/enrich', async (req, res) => {
  try {
    const products = await catalogService.getCatalog();
    const product  = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: `Product not found: ${req.params.id}` });

    const enriched = await contentService.enrichProduct(product);
    res.json(enriched);
  } catch (err) {
    console.error('Enrich error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/catalog/enrich-all
 * Batch enriches all products
 */
router.post('/catalog/enrich-all', async (req, res) => {
  try {
    const products = await catalogService.getCatalog();
    const enriched = await Promise.all(products.map(p => contentService.enrichProduct(p)));
    res.json({ message: 'All products enriched', count: enriched.length, products: enriched });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Lab 5: Storefront ──────────────────────────────────────────────────────

/**
 * GET /api/products
 * All products — used by React product listing page
 */
router.get('/products', async (req, res) => {
  try {
    const products = await catalogService.getCatalog();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/products/:id
 * Single product — used by React product detail page
 */
router.get('/products/:id', async (req, res) => {
  try {
    const products = await catalogService.getCatalog();
    const product  = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: `Product not found: ${req.params.id}` });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

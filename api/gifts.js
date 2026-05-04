const { connectToDatabase, seedIfEmpty } = require('./_db');

module.exports = async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const col = db.collection('gifts');

    if (req.method === 'GET') {
      // Auto-seed on first ever request
      await seedIfEmpty(db);
      const gifts = await col.find().toArray();
      return res.json(gifts);
    }

    if (req.method === 'POST') {
      const { emoji, name, desc, link } = req.body;
      if (!emoji || !name || !desc) {
        return res.status(400).json({ error: 'Faltan campos (emoji, name, desc)' });
      }
      const gift = { emoji, name, desc, link: link || '', gifted: false };
      const result = await col.insertOne(gift);
      return res.json({ _id: result.insertedId, ...gift });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API /gifts error:', err);
    return res.status(500).json({ error: err.message });
  }
};

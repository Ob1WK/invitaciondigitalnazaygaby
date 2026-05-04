const { connectToDatabase } = require('../_db');
const { ObjectId } = require('mongodb');

module.exports = async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const col = db.collection('gifts');
    const { id } = req.query;

    if (req.method === 'PUT') {
      const update = {};
      const allowed = ['emoji', 'name', 'desc', 'link', 'gifted'];
      for (const key of allowed) {
        if (req.body[key] !== undefined) update[key] = req.body[key];
      }
      await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
      const gift = await col.findOne({ _id: new ObjectId(id) });
      return res.json(gift);
    }

    if (req.method === 'DELETE') {
      await col.deleteOne({ _id: new ObjectId(id) });
      return res.json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API /gifts/[id] error:', err);
    return res.status(500).json({ error: err.message });
  }
};

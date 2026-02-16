/**
 * Quick test of improved search functionality
 */
require('dotenv').config();
const mongoose = require('mongoose');
const { Article, ArticleEmbedding } = require('./models');
const embeddingService = require('./services/embeddingService');

async function testSearch() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test queries with various types of words
    const testQueries = [
      'database',
      'connection', 
      'timeout',
      'error',
      'server',
      'node',
      'react',
      'component'
    ];

    const allEmbeddings = await ArticleEmbedding.find({})
      .populate({
        path: 'article',
        match: { status: 'APPROVED' }
      });
    
    const validEmbeddings = allEmbeddings.filter(emb => emb.article);
    console.log(`📚 Testing with ${validEmbeddings.length} indexed articles\n`);

    for (const query of testQueries) {
      console.log(`🔍 Testing: "${query}"`);
      
      const keywords = embeddingService.extractKeywords(query);
      console.log(`   Keywords: [${keywords.join(', ')}]`);
      
      const queryEmbedding = await embeddingService.generateEmbedding(query);
      
      const similarDocs = embeddingService.findSimilarDocumentsHybrid(
        query,
        queryEmbedding,
        validEmbeddings.map(emb => ({
          ...emb.toObject(),
          article: emb.article.toObject()
        })),
        3
      );

      if (similarDocs.length > 0 && similarDocs[0].similarity > 0.001) {
        console.log(`   ✅ FOUND: "${similarDocs[0].article.title}" (${(similarDocs[0].similarity * 100).toFixed(1)}%)`);
      } else {
        console.log(`   ❌ Not found above threshold`);
      }
      console.log('');
    }

    console.log('✅ Test complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testSearch();

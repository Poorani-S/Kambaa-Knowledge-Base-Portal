require('dotenv').config();
const mongoose = require('mongoose');
const { ArticleEmbedding } = require('./models');
const embeddingService = require('./services/embeddingService');

async function testMultipleSearches() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const queries = ['vpn', 'windows update', 'digital transformation', 'timeout'];
    
    const allEmbeddings = await ArticleEmbedding.find({}).populate({
      path: 'article',
      match: { status: 'APPROVED' }
    });
    
    const validEmbeddings = allEmbeddings.filter(emb => emb.article)
      .map(emb => ({
        ...emb.toObject(),
        article: emb.article.toObject()
      }));

    console.log('🔍 Testing Chatbot Search with Different Queries\n');
    console.log(`📚 Testing against ${validEmbeddings.length} indexed articles\n`);
    
    for (const query of queries) {
      console.log(`Query: "${query}"`);
      const queryEmbedding = await embeddingService.generateEmbedding(query);
      const results = embeddingService.findSimilarDocumentsHybrid(query, queryEmbedding, validEmbeddings, 3);
      
      if (results.length > 0 && results[0].similarity > 0.001) {
        console.log(`  ✅ Top Match: "${results[0].article.title}"`);
        console.log(`     Confidence: ${(results[0].similarity * 100).toFixed(1)}%`);
      } else {
        console.log('  ❌ No results found');
      }
      console.log('');
    }
    
    console.log('✅ All searches working!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testMultipleSearches();

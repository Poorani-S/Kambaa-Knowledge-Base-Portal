/**
 * Test script to verify chatbot functionality
 * Run with: node test-chatbot.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Article, ArticleEmbedding } = require('./models');
const embeddingService = require('./services/embeddingService');

async function testChatbot() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check approved articles
    const approvedArticles = await Article.find({ status: 'APPROVED' });
    console.log(`📚 Total approved articles: ${approvedArticles.length}`);
    
    if (approvedArticles.length > 0) {
      console.log('\nFirst 5 approved articles:');
      approvedArticles.slice(0, 5).forEach((article, idx) => {
        console.log(`  ${idx + 1}. ${article.title} (ID: ${article._id})`);
      });
    }

    // Check indexed articles
    const indexedArticles = await ArticleEmbedding.countDocuments();
    console.log(`\n🗂️  Total indexed articles: ${indexedArticles}`);
    console.log(`⚠️  Articles needing indexing: ${approvedArticles.length - indexedArticles}\n`);

    if (indexedArticles === 0) {
      console.log('❌ NO ARTICLES ARE INDEXED!');
      console.log('   This is why the chatbot cannot find anything.\n');
      console.log('📝 To fix this, you need to:');
      console.log('   1. Start the backend server: cd backend && npm start');
      console.log('   2. Login as admin');
      console.log('   3. Go to Admin Dashboard');
      console.log('   4. Click "Index All Articles" button');
      console.log('   OR use the API:');
      console.log('   POST /api/chatbot/index-all (requires admin authentication)\n');
    } else {
      console.log('✅ Articles are indexed. Testing search...\n');
      
      // Test with first article
      if (approvedArticles.length > 0) {
        const testArticle = approvedArticles[0];
        const testQuery = testArticle.title.split(' ').slice(0, 3).join(' ');
        
        console.log(`🔍 Test query: "${testQuery}"`);
        console.log(`   (from article: "${testArticle.title}")\n`);
        
        // Generate query embedding
        const queryEmbedding = await embeddingService.generateEmbedding(testQuery);
        
        // Get all embeddings
        const allEmbeddings = await ArticleEmbedding.find({})
          .populate({
            path: 'article',
            match: { status: 'APPROVED' }
          });
        
        const validEmbeddings = allEmbeddings.filter(emb => emb.article);
        
        // Find similar documents
        const similarDocs = embeddingService.findSimilarDocumentsHybrid(
          testQuery,
          queryEmbedding,
          validEmbeddings.map(emb => ({
            ...emb.toObject(),
            article: emb.article.toObject()
          })),
          5
        );
        
        console.log('📊 Search results:');
        similarDocs.slice(0, 3).forEach((doc, idx) => {
          console.log(`\n  ${idx + 1}. ${doc.article.title}`);
          console.log(`     Overall Score: ${(doc.similarity * 100).toFixed(1)}%`);
          console.log(`     Semantic: ${(doc.semanticScore * 100).toFixed(1)}%`);
          console.log(`     Keyword: ${(doc.keywordScore * 100).toFixed(1)}%`);
          console.log(`     Title Matches: ${doc.titleMatches}`);
          console.log(`     Content Matches: ${doc.contentMatches}`);
          console.log(`     Exact Match: ${doc.exactMatch ? '✅' : '❌'}`);
        });
        
        if (similarDocs.length > 0 && similarDocs[0].similarity > 0.01) {
          console.log('\n✅ SEARCH IS WORKING! The chatbot should find articles.');
        } else {
          console.log('\n⚠️  Search score is low. Articles might not be found.');
        }
      }
    }

    console.log('\n🔧 Embedding Configuration:');
    console.log(`   Provider: ${process.env.EMBEDDING_PROVIDER || 'local'}`);
    console.log(`   Configured: ${embeddingService.isConfigured() ? '✅' : '❌'}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the test
testChatbot();

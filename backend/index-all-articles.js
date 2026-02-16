require('dotenv').config();
const mongoose = require('mongoose');
const { Article, ArticleEmbedding } = require('./models');
const embeddingService = require('./services/embeddingService');

async function indexAllArticles() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all approved articles
    const articles = await Article.find({ status: 'APPROVED' });
    console.log(`📚 Found ${articles.length} approved articles\n`);

    if (articles.length === 0) {
      console.log('⚠️  No approved articles to index');
      return;
    }

    let indexed = 0;
    let skipped = 0;
    let failed = 0;

    for (const article of articles) {
      try {
        // Check if already indexed
        const existing = await ArticleEmbedding.findOne({ article: article._id });
        
        if (existing) {
          console.log(`⏭️  Skipped: "${article.title}" (already indexed)`);
          skipped++;
          continue;
        }

        // Prepare text for embedding
        let textToEmbed = `${article.title}\n\n${article.excerpt || ''}\n\n${article.content}`;
        if (article.pdfText) {
          textToEmbed += `\n\n--- PDF Content ---\n${article.pdfText}`;
        }

        console.log(`🔄 Indexing: "${article.title}"...`);
        
        // Generate embedding
        const embedding = await embeddingService.generateEmbedding(textToEmbed);

        // Save embedding
        await ArticleEmbedding.findOneAndUpdate(
          { article: article._id },
          {
            article: article._id,
            embedding,
            textContent: textToEmbed,
            embeddingModel: process.env.EMBEDDING_MODEL || 'local-tfidf-v2',
            lastUpdated: new Date()
          },
          { upsert: true, new: true }
        );

        console.log(`✅ Indexed: "${article.title}"\n`);
        indexed++;

      } catch (error) {
        console.error(`❌ Failed: "${article.title}" - ${error.message}\n`);
        failed++;
      }
    }

    console.log('\n📊 Indexing Summary:');
    console.log(`   ✅ Newly indexed: ${indexed}`);
    console.log(`   ⏭️  Already indexed: ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📚 Total articles: ${articles.length}`);
    
    const totalIndexed = await ArticleEmbedding.countDocuments();
    console.log(`\n🎉 All done! ${totalIndexed}/${articles.length} articles are now indexed.`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

indexAllArticles();

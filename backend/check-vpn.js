require('dotenv').config();
const mongoose = require('mongoose');
const { Article, ArticleEmbedding } = require('./models');

async function checkVPN() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Find VPN article
    const vpnArticle = await Article.findOne({ title: /VPN/i });
    
    if (vpnArticle) {
      console.log('✅ VPN Article found:');
      console.log('   ID:', vpnArticle._id);
      console.log('   Title:', vpnArticle.title);
      console.log('   Status:', vpnArticle.status);
      
      const indexed = await ArticleEmbedding.findOne({ article: vpnArticle._id });
      console.log('   Indexed:', indexed ? '✅ YES' : '❌ NO');
      
      if (!indexed && vpnArticle.status === 'APPROVED') {
        console.log('\n⚠️  VPN article is APPROVED but NOT INDEXED!');
        console.log('   This is why the chatbot cannot find it.');
      }
    } else {
      console.log('❌ VPN article not found in database');
    }
    
    // Show all approved articles
    const allApproved = await Article.find({ status: 'APPROVED' }).select('title');
    console.log(`\n📚 All ${allApproved.length} approved articles:`);
    allApproved.forEach((a, i) => console.log(`   ${i+1}. ${a.title}`));
    
    const allIndexed = await ArticleEmbedding.countDocuments();
    console.log(`\n📊 Indexing status: ${allIndexed}/${allApproved.length} indexed`);
    
    if (allIndexed < allApproved.length) {
      console.log(`\n⚠️  ${allApproved.length - allIndexed} articles need to be indexed!`);
      console.log('   Solution: Go to Admin Dashboard → Click "Index All Articles" button');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkVPN();

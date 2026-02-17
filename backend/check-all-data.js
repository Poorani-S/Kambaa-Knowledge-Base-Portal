/**
 * Check all users and articles in database
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { User, Article } = require('./models');

async function checkAllData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get all users
    const users = await User.find({}).select('-password');
    console.log(`👥 USERS (${users.length} total):\n`);
    users.forEach((user, idx) => {
      console.log(`  ${idx + 1}. ${user.username} (${user.email}) - ${user.role}`);
    });

    // Get all articles grouped by status
    const allArticles = await Article.find({}).populate('author', 'username email').sort({ createdAt: -1 });
    
    console.log(`\n📚 ARTICLES (${allArticles.length} total):\n`);
    
    const grouped = {
      APPROVED: [],
      PENDING: [],
      REJECTED: [],
      DRAFT: []
    };
    
    allArticles.forEach(article => {
      grouped[article.status].push(article);
    });

    Object.keys(grouped).forEach(status => {
      if (grouped[status].length > 0) {
        console.log(`\n${status} (${grouped[status].length}):`);
        grouped[status].forEach((article, idx) => {
          console.log(`  ${idx + 1}. "${article.title}"`);
          console.log(`     Author: ${article.author?.username || 'Unknown'} (${article.author?.email || 'N/A'})`);
          console.log(`     Created: ${article.createdAt.toLocaleString()}`);
          if (article.rejectionReason) {
            console.log(`     Rejection: ${article.rejectionReason}`);
          }
          console.log('');
        });
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkAllData();

/**
 * Quick script to verify articles by status
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { Article } = require('./models');

async function checkArticles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const pending = await Article.find({ status: 'PENDING' }).populate('author', 'username email');
    const approved = await Article.find({ status: 'APPROVED' }).populate('author', 'username email');
    const rejected = await Article.find({ status: 'REJECTED' }).populate('author', 'username email');

    console.log('📊 ARTICLE STATUS SUMMARY:\n');
    
    console.log(`✅ APPROVED (${approved.length}):`);
    approved.forEach((article, idx) => {
      console.log(`  ${idx + 1}. "${article.title}"`);
      console.log(`     Author: ${article.author.username}`);
      console.log(`     Views: ${article.views}\n`);
    });

    console.log(`⏳ PENDING APPROVAL (${pending.length}):`);
    pending.forEach((article, idx) => {
      console.log(`  ${idx + 1}. "${article.title}"`);
      console.log(`     Author: ${article.author.username} (${article.author.email})`);
      console.log(`     Submitted: ${article.createdAt.toLocaleDateString()}\n`);
    });

    console.log(`❌ REJECTED (${rejected.length}):`);
    rejected.forEach((article, idx) => {
      console.log(`  ${idx + 1}. "${article.title}"`);
      console.log(`     Author: ${article.author.username}`);
      console.log(`     Reason: ${article.rejectionReason}\n`);
    });

    console.log('💡 Next Steps:');
    console.log('   1. Login as admin (admin@kambaa.in / admin123)');
    console.log('   2. Go to Admin Dashboard');
    console.log('   3. Review pending articles');
    console.log('   4. Approve or reject articles as needed\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkArticles();

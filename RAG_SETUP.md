# RAG (Retrieval-Augmented Generation) Setup Guide

## 🤖 What is RAG?

RAG enhances your chatbot with AI-powered semantic search and intelligent answer generation. Instead of simple keyword matching, RAG:

1. **Understands Context**: Uses AI embeddings to understand the meaning of questions
2. **Finds Relevant Content**: Retrieves semantically similar articles (not just keyword matches)
3. **Generates Answers**: Creates intelligent, context-aware responses using LLM
4. **Shows Sources**: Provides similarity scores and links to source articles

## 📋 Prerequisites

- OpenAI API key (or other LLM provider API key)
- MongoDB database
- Node.js backend running

## 🚀 Quick Start

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-`)

### 2. Configure Environment Variables

Add to your **backend/.env** file:

```env
# RAG/AI Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here
EMBEDDING_PROVIDER=openai
EMBEDDING_MODEL=text-embedding-3-small
LLM_MODEL=gpt-3.5-turbo
```

**Model Options:**
- `EMBEDDING_MODEL`: 
  - `text-embedding-3-small` (faster, cheaper, recommended)
  - `text-embedding-3-large` (more accurate, more expensive)
  
- `LLM_MODEL`:
  - `gpt-3.5-turbo` (faster, cheaper, recommended)
  - `gpt-4` (more accurate, more expensive)
  - `gpt-4-turbo` (balance of speed and accuracy)

### 3. Restart Backend Server

```bash
cd backend
npm run dev
```

### 4. Index Your Articles

You need to generate embeddings for all approved articles.

**Option A: Using Admin Dashboard**
1. Log in as admin
2. Go to Admin Dashboard
3. Navigate to "RAG Settings" (if you add this to UI)
4. Click "Index All Articles"

**Option B: Using API (via Postman/curl)**

```bash
# Get your auth token first (login as admin)
TOKEN=your_admin_jwt_token

# Index all approved articles
curl -X POST http://localhost:5000/api/chatbot/index-all \
  -H "Authorization: Bearer $TOKEN"

# Check indexing status
curl -X GET http://localhost:5000/api/chatbot/index-status \
  -H "Authorization: Bearer $TOKEN"
```

**Option C: Using PowerShell**

```powershell
# Login and get token
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    email = "admin@kambaa.in"
    password = "your_admin_password"
  } | ConvertTo-Json)

$token = $response.token

# Index all articles
Invoke-RestMethod -Uri "http://localhost:5000/api/chatbot/index-all" `
  -Method POST `
  -Headers @{ Authorization = "Bearer $token" }

# Check status
Invoke-RestMethod -Uri "http://localhost:5000/api/chatbot/index-status" `
  -Method GET `
  -Headers @{ Authorization = "Bearer $token" }
```

## 📊 API Endpoints

### User Endpoints

**RAG Search** (Semantic + AI Answer)
```http
POST /api/chatbot/rag-search
Authorization: Bearer {token}
Content-Type: application/json

{
  "query": "How do I fix database connection errors?"
}
```

**Keyword Search** (Fallback)
```http
POST /api/chatbot/search
Authorization: Bearer {token}
Content-Type: application/json

{
  "query": "database error"
}
```

### Admin Endpoints

**Index Single Article**
```http
POST /api/chatbot/index-article/:articleId
Authorization: Bearer {admin_token}
```

**Index All Articles**
```http
POST /api/chatbot/index-all
Authorization: Bearer {admin_token}
```

**Get Index Status**
```http
GET /api/chatbot/index-status
Authorization: Bearer {admin_token}
```

## 💡 Usage

### Frontend Chatbot

1. Navigate to `/chatbot` page
2. Type your question naturally
3. Get AI-generated answer with sources
4. Click on source articles for more details

**Example Questions:**
- "How do I deploy this application to production?"
- "What are the database backup procedures?"
- "How to fix authentication errors?"
- "Steps to configure environment variables"

### Response Format

**RAG Response:**
```json
{
  "found": true,
  "ragEnabled": true,
  "aiAnswer": "To fix database connection errors, you should...",
  "sources": [
    {
      "id": "article_id",
      "title": "Database Configuration Guide",
      "category": "Infrastructure",
      "excerpt": "...",
      "similarity": "95.3%",
      "tags": ["database", "mongodb"],
      "views": 150,
      "author": "admin"
    }
  ],
  "alternativeResults": [...]
}
```

**Keyword Response (Fallback):**
```json
{
  "found": true,
  "article": {
    "id": "article_id",
    "title": "Article Title",
    "category": "Category",
    "content": "Full content...",
    "excerpt": "Summary..."
  },
  "alternativeResults": [...]
}
```

## 🔧 Maintenance

### When to Re-Index

Re-index articles when:
- ✅ New article is approved
- ✅ Article content is updated
- ✅ You change embedding models
- ✅ You want to refresh all embeddings

### Auto-Indexing (Optional Enhancement)

You can automatically index articles when they're approved by adding this to your article approval logic:

```javascript
// In articleController.js - approveArticle method
const { indexArticle } = require('./chatbotController');

// After approving article
await indexArticle({ params: { articleId: article._id } }, res);
```

### Cost Estimation

**OpenAI Pricing (as of 2024):**
- Embeddings (text-embedding-3-small): $0.0001 per 1K tokens
- GPT-3.5-turbo: $0.0015 per 1K tokens (prompt) + $0.002 per 1K tokens (completion)

**Example:**
- 100 articles (avg 1000 words each) ≈ $0.15 one-time
- 1000 queries per month ≈ $3-5 per month

## 🐛 Troubleshooting

### "RAG service is not configured"
- Check if `OPENAI_API_KEY` is set in `.env`
- Verify API key is valid
- Restart backend server

### "No indexed articles found"
- Run `POST /api/chatbot/index-all` to index all articles
- Check if you have approved articles
- Verify MongoDB connection

### "Error generating embedding"
- Check OpenAI API key is valid and has credits
- Check internet connection
- Verify article content isn't too long (max 8000 chars per article)

### Low Similarity Scores
- Try rephrasing your question
- Add more detailed articles
- Use different embedding model (try `text-embedding-3-large`)

### Slow Response Times
- Embeddings are cached in database
- First-time indexing takes time
- Consider using faster model (`gpt-3.5-turbo` instead of `gpt-4`)

## 🔒 Security

- ✅ All RAG endpoints require authentication
- ✅ Only admins can index articles
- ✅ API keys stored in environment variables
- ✅ Never expose API keys in frontend

## 🌟 Best Practices

1. **Index Regularly**: Set up a schedule to re-index articles weekly
2. **Monitor Costs**: Check OpenAI usage dashboard regularly
3. **Quality Content**: Better articles = better AI answers
4. **Use Excerpts**: Good article summaries improve RAG accuracy
5. **Tag Articles**: Proper categorization helps retrieval
6. **Test Questions**: Try various question formats to optimize

## 📈 Future Enhancements

Potential improvements:
- [ ] Support for other LLM providers (Gemini, Claude, etc.)
- [ ] Auto-indexing on article approval
- [ ] RAG analytics dashboard
- [ ] Custom embedding fine-tuning
- [ ] Multi-language support
- [ ] Conversation history/follow-up questions
- [ ] Response rating and feedback

## 📚 Additional Resources

- [OpenAI Documentation](https://platform.openai.com/docs)
- [RAG Architecture Guide](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [Embedding Models Comparison](https://openai.com/blog/new-embedding-models)

## 🆘 Need Help?

- Check the backend logs for detailed error messages
- Test with simple queries first
- Verify all environment variables are set
- Check MongoDB connection and data
- Ensure OpenAI API has sufficient credits

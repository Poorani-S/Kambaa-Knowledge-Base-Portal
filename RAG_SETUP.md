# RAG (AI-Powered Search) Setup Guide

## 🤖 What is RAG?

RAG (Retrieval-Augmented Generation) enhances your chatbot with:
- 🔍 Semantic search (understands question meaning)
- 🎯 AI-generated answers from your knowledge base
- 📚 Source attribution with similarity scores

## ⚙️ Configuration Options

### Option 1: Local Mode (FREE - Recommended to Start)
✅ No API key needed  
✅ Works immediately  
✅ Fast semantic search  
✅ Template-based answers  

```env
EMBEDDING_PROVIDER=local
```

### Option 2: Google Gemini (AI-Powered Answers)
✅ Free tier available (15 requests/min)  
✅ AI-generated conversational answers  
✅ Uses local embeddings + Gemini LLM  

```env
EMBEDDING_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
LLM_MODEL=gemini-pro
```

**Get API Key:** https://aistudio.google.com/apikey

**Note:** Gemini uses local embeddings (free) and only calls the API for answer generation.

### Option 3: OpenAI (Alternative)
```env
EMBEDDING_PROVIDER=openai
OPENAI_API_KEY=your_api_key_here
LLM_MODEL=gpt-3.5-turbo
```

**Get API Key:** https://platform.openai.com/api-keys

---

## 🚀 Quick Start

### 1. Configure .env File

Edit `backend/.env`:

```env
# For local (free):
EMBEDDING_PROVIDER=local

# For Gemini AI:
EMBEDDING_PROVIDER=gemini
GEMINI_API_KEY=AIza...
LLM_MODEL=gemini-pro
```

### 2. Restart Server
```bash
cd backend
npm run dev
```

### 3. Index Your Articles

**Via API (Postman/curl):**
```bash
# Login as admin to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kambaa.in","password":"admin123"}'

# Index all articles
curl -X POST http://localhost:5000/api/chatbot/index-all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Via Admin Dashboard:**
- Login as admin
- Navigate to admin section
- Use index functionality (if implemented in UI)

### 4. Test the Chatbot

Go to the chatbot page and ask questions like:
- "How to fix database connection error?"
- "API timeout issue solution"
- "React component not rendering"

---

## 📊 How It Works

### Architecture

```
User Question
    ↓
Generate Embedding (local or API)
    ↓
Search Similar Articles (cosine similarity)
    ↓
Retrieve Top Matches
    ↓
Generate Answer (template or AI)
    ↓
Return Answer + Sources
```

### Hybrid Search
Combines two approaches:
1. **Semantic similarity** (60%) - Understands meaning
2. **Keyword matching** (40%) - Finds exact terms

### Indexing Process
1. Extract text from articles
2. Generate embeddings (vector representations)
3. Store in `ArticleEmbedding` collection
4. Use for fast similarity search

---

## 🔧 Management

### Index Single Article
```bash
POST /api/chatbot/index-article/:articleId
Authorization: Bearer <admin-token>
```

### Index All Articles
```bash
POST /api/chatbot/index-all
Authorization: Bearer <admin-token>
```

### Check Index Status
```bash
GET /api/chatbot/index-status
Authorization: Bearer <admin-token>
```

### Search with RAG
```bash
POST /api/chatbot/rag-search
Authorization: Bearer <token>
Content-Type: application/json

{
  "query": "your question here"
}
```

---

## 💡 Best Practices

1. **Re-index after updates:** When articles are edited, re-index them
2. **Approve articles first:** Only approved articles are searchable
3. **Use descriptive titles:** Helps with keyword matching
4. **Add good excerpts:** Improves answer quality
5. **Test queries:** Verify answers are relevant

---

## 🐛 Troubleshooting

**No results found:**
- Ensure articles are indexed: `GET /api/chatbot/index-status`
- Check articles are approved (status: APPROVED)
- Try different query phrasing

**Low similarity scores:**
- Normal for local embeddings (threshold: 0.15)
- Improve with better article content
- Use more specific queries

**Gemini API errors:**
- Verify API key at https://aistudio.google.com/apikey
- Check API quotas
- Fall back to local mode if needed

**Slow performance:**
- Consider indexing only approved articles
- Limit search results (default: top 5)
- Use local mode for faster responses

---

## 📈 Performance

### Local Mode
- **Embedding generation:** <10ms
- **Search time:** <50ms (256d vectors)
- **Total response:** <100ms
- **Cost:** FREE

### Gemini Mode
- **Embedding generation:** <10ms (local)
- **Search time:** <50ms
- **Answer generation:** 500-1500ms (API)
- **Total response:** <2 seconds
- **Cost:** Free tier: 15 req/min

### OpenAI Mode
- **Embedding generation:** 100-300ms (API)
- **Search time:** <50ms
- **Answer generation:** 500-2000ms (API)
- **Total response:** 1-3 seconds
- **Cost:** ~$0.005 per query

---

## 🎓 Tips

- Start with **local mode** to test functionality
- Activate **Gemini** when you want AI-generated answers
- Use **OpenAI** only if you need their specific models
- Local mode is production-ready for most use cases
- Monitor API usage and costs when using external providers

---

For deployment configuration, see [DEPLOYMENT.md](DEPLOYMENT.md).

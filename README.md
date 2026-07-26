# Cook & Bake Academy - Copilot Studio Course Assistant

![Microsoft Copilot Studio](https://img.shields.io/badge/Microsoft-Copilot_Studio-742774?logo=microsoft&logoColor=white)
![PDF Knowledge](https://img.shields.io/badge/Knowledge-PDFs-D2691E)
![HTML/CSS/JS](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-E34F26?logo=html5&logoColor=white)

A replica of the Cook & Bake Academy landing page with the original floating chatbot
design wrapped around a live **Microsoft Copilot Studio** canvas. The site includes
20 mock courses and two upload-ready knowledge PDFs for grounding the Copilot agent.

## Live Demo

🔗 **https://alfredang.github.io/copilot-bakery/**

![Cook & Bake Academy — home screen](screenshot.png)

## What's inside

| Path | Description |
|------|-------------|
| [`website/`](website/) | One-page landing site (HTML/CSS/JS) with a floating Copilot Studio chatbot widget. Images from Unsplash. |
| [`brochures/`](brochures/) | 20 mock course brochures (`.txt`) — 10 bakery + 10 cooking — to upload to Google Drive. |
| [`output/pdf/`](output/pdf/) | Upload-ready refund policy and combined course brochure PDFs for the Copilot agent. |
| [`tools/generate_mock_pdfs.py`](tools/generate_mock_pdfs.py) | Reproducible ReportLab generator for both mock PDFs. |
| [`skills/`](skills/) | Source files and upload-ready ZIP packages for three Copilot Studio agent skills. |
| [`custom-instructions.md`](custom-instructions.md) | Website-specific Copilot Studio instructions for course guidance, pricing, enrolment, refunds, and safety. |
| [`n8n-workflows/`](n8n-workflows/) | 3 **manual-trigger** ingestion workflows (Supabase, Pinecone, Qdrant). |
| [`CX Agent with RAG.json`](CX%20Agent%20with%20RAG.json) | The answering RAG agent workflow: **Webhook (POST) → AI Agent (Gemini Flash + Pinecone retrieval tool) → Respond to Webhook**. |
| [`LEARNER-GUIDE.md`](LEARNER-GUIDE.md) | Step-by-step setup for Supabase, Pinecone & Qdrant vector databases. |

## Quick start

1. **View the site** - open [`website/index.html`](website/index.html) in a browser or
   serve the repository locally. Click the chat button to open the Copilot Studio agent.

2. **Upload the knowledge files** - add both files from [`output/pdf/`](output/pdf/) as
   knowledge sources in the Copilot Studio agent, then publish the agent.

3. **Regenerate the PDFs** - run `python3 tools/generate_mock_pdfs.py` after changing
   brochure text or policy content.

## The 3 ingestion workflows (Manual Trigger)

Each does: **Manual Trigger → List Drive folder → Download each brochure → Split → Embed → Upsert** into:

- [`1_Upload_Brochures_to_Supabase_Manual.json`](n8n-workflows/1_Upload_Brochures_to_Supabase_Manual.json) — Supabase pgvector (OpenAI embeddings, 1536 dims)
- [`2_Upload_Brochures_to_Pinecone_Manual.json`](n8n-workflows/2_Upload_Brochures_to_Pinecone_Manual.json) — Pinecone (Google Gemini `gemini-embedding-001`, **3072 dims**; embeds each brochure as **one whole-document vector** → 20 records)
- [`3_Upload_Brochures_to_Qdrant_Manual.json`](n8n-workflows/3_Upload_Brochures_to_Qdrant_Manual.json) — Qdrant (OpenAI embeddings, 1536 dims)

> Your vector table/index/collection dimension must match the embedding model —
> see the learner guide. The insert and retrieval nodes must also use the same
> index **and namespace** (both are left on the default namespace here).

## RAG accuracy & speed tuning (baked into the workflows)

- **Whole-brochure chunks** — each ~2.7 KB brochure is one vector (chunk size 4000),
  so retrieval returns complete brochures instead of fragments.
- **Matching namespaces** — insert & retrieve both use Pinecone's default namespace;
  a mismatch makes retrieval silently return nothing.
- **Top K = 5** with a descriptive tool description, so comparison questions work.
- **`gemini-2.5-flash`** chat model for fast responses.
- The webhook trigger passes `{{ $json.body.chatInput }}` to the agent (a Webhook
  wraps the POST payload in `body`, unlike a Chat Trigger).

## Regenerate the brochures

```bash
cd brochures && python3 _generate_brochures.py
```

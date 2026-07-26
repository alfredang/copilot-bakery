# Cook & Bake Academy - Copilot Studio Course Assistant

![Microsoft Copilot Studio](https://img.shields.io/badge/Microsoft-Copilot_Studio-742774?logo=microsoft&logoColor=white)
![PDF Knowledge](https://img.shields.io/badge/Knowledge-PDFs-D2691E)
![HTML/CSS/JS](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-E34F26?logo=html5&logoColor=white)

A replica of the Cook & Bake Academy landing page connected to a published
**Microsoft Copilot Studio** agent. The site includes
20 mock courses and two upload-ready knowledge PDFs for grounding the Copilot agent.

## Live Demo

🔗 **https://alfredang.github.io/copilot-bakery/**

![Cook & Bake Academy — home screen](screenshot.png)

## What's inside

| Path | Description |
|------|-------------|
| [`website/`](website/) | One-page landing site with a bakery-branded, in-page Direct Line chat client. Images from Unsplash. |
| [`api/`](api/) | Secure Azure Function that exchanges the Direct Line secret for short-lived browser conversation tokens. |
| [`brochures/`](brochures/) | 20 mock course brochures (`.txt`) - 10 bakery + 10 cooking - for Copilot Studio knowledge. |
| [`output/pdf/`](output/pdf/) | Upload-ready refund policy and combined course brochure PDFs for the Copilot agent. |
| [`tools/generate_mock_pdfs.py`](tools/generate_mock_pdfs.py) | Reproducible ReportLab generator for both mock PDFs. |
| [`skills/`](skills/) | Source files and upload-ready ZIP packages for three Copilot Studio agent skills. |
| [`custom-instructions.md`](custom-instructions.md) | Website-specific Copilot Studio instructions for course guidance, pricing, enrolment, refunds, and safety. |

## Quick start

1. **Configure Direct Line** - set the agent to **No authentication**, enable
   **Require secured access** under **Web channel security**, and keep both
   generated secrets private.

2. **Run the token service** - copy `.env.example` to `.env`, set
   `DIRECT_LINE_SECRET`, install the dependencies in [`api/`](api/), and start the
   Azure Function. Never place the secret in [`website/`](website/).

3. **Connect the website** - set `tokenServiceUrl` in
   [`website/copilot-config.js`](website/copilot-config.js) to the deployed Azure
   Function endpoint. The conversation stays inside the branded website chat.

4. **Upload the knowledge files** - add both files from [`output/pdf/`](output/pdf/) as
   knowledge sources in the Copilot Studio agent, then publish the agent.

5. **Upload the agent skills** - add each ZIP file from [`skills/`](skills/) through
   Copilot Studio's **Add skill** interface.

6. **Apply the custom instructions** - copy the content from
   [`custom-instructions.md`](custom-instructions.md) into the agent instructions.

## Secure Direct Line configuration

The Direct Line secret must never be included in browser JavaScript or committed
to GitHub. For local development, copy `.env.example` to `.env` and set
`DIRECT_LINE_SECRET`. In production, add the same name as an Azure Function
application setting. The browser calls `/api/directline/token` and receives only
a short-lived, single-conversation token.

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
| [`website/`](website/) | One-page landing site whose chat calls-to-action open the published Copilot Studio agent. Images from Unsplash. |
| [`brochures/`](brochures/) | 20 mock course brochures (`.txt`) - 10 bakery + 10 cooking - for Copilot Studio knowledge. |
| [`output/pdf/`](output/pdf/) | Upload-ready refund policy and combined course brochure PDFs for the Copilot agent. |
| [`tools/generate_mock_pdfs.py`](tools/generate_mock_pdfs.py) | Reproducible ReportLab generator for both mock PDFs. |
| [`skills/`](skills/) | Source files and upload-ready ZIP packages for three Copilot Studio agent skills. |
| [`custom-instructions.md`](custom-instructions.md) | Website-specific Copilot Studio instructions for course guidance, pricing, enrolment, refunds, and safety. |

## Quick start

1. **Connect the published agent** - copy the **Demo Website** URL from Copilot
   Studio's publish screen and paste it into
   [`website/copilot-config.js`](website/copilot-config.js). The website opens the
   agent in a new tab; nothing is embedded.

2. **View the site** - serve the repository locally and open
   [`website/index.html`](website/index.html). Click the chat button to open the
   published course assistant.

3. **Upload the knowledge files** - add both files from [`output/pdf/`](output/pdf/) as
   knowledge sources in the Copilot Studio agent, then publish the agent.

4. **Upload the agent skills** - add each ZIP file from [`skills/`](skills/) through
   Copilot Studio's **Add skill** interface.

5. **Apply the custom instructions** - copy the content from
   [`custom-instructions.md`](custom-instructions.md) into the agent instructions.
